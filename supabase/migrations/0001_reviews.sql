/* =========================================================
   LATA SCIENTIFIC — customer review system
   Applied to Supabase project yoqdsrwnwcdwzdcyemjl (ap-south-1).

   Design rules this schema enforces in the DATABASE, not in the browser:
     - a submitted review is always 'pending'; the public role has no
       privilege on the status column at all, so it cannot self-approve
     - the public role can never read the email column, on any row
     - the public role can only read rows whose status is 'approved'
     - only an address listed in public.admins may moderate
   ========================================================= */

-- ---------- who may moderate ----------
create table if not exists public.admins (
  email      text primary key,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;

/* HISTORICAL — left exactly as it was executed. 0002_status_published.sql
   drops public.admins entirely, so this seed no longer exists in the database
   and the address below is not a live contact address. The site's contact
   address is sales@latascientific.com, defined once in scripts/build.mjs. */
insert into public.admins (email) values ('latascientific@gmail.com')
  on conflict (email) do nothing;

/* SECURITY DEFINER so the check itself is not subject to RLS on admins —
   otherwise every policy that calls it would recurse into another policy. */
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a
    where lower(a.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create policy admins_self_read on public.admins
  for select to authenticated using (public.is_admin());

-- ---------- reviews ----------
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  company     text,
  designation text,
  email       text not null,
  review      text not null,
  rating      smallint not null,
  photo_url   text,
  consent     boolean not null default false,
  status      text not null default 'pending',
  created_at  timestamptz not null default now(),
  approved_at timestamptz,
  /* Honeypot. A real form leaves this empty; scripted spam fills every input
     it can see. The constraint means a filled honeypot is rejected by the
     database even if the browser check is bypassed. */
  website     text,

  constraint reviews_name_len   check (char_length(btrim(name)) between 2 and 120),
  constraint reviews_company_len check (company is null or char_length(company) <= 160),
  constraint reviews_desig_len   check (designation is null or char_length(designation) <= 160),
  constraint reviews_email_fmt   check (char_length(email) <= 254 and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  constraint reviews_review_len  check (char_length(btrim(review)) between 25 and 2000),
  constraint reviews_rating_rng  check (rating between 1 and 5),
  constraint reviews_status_enum check (status in ('pending', 'approved', 'rejected')),
  constraint reviews_honeypot    check (website is null or website = '')
);

create index if not exists reviews_public_idx  on public.reviews (status, approved_at desc);
create index if not exists reviews_created_idx on public.reviews (created_at desc);

-- ---------- trim on the way in ----------
create or replace function public.reviews_normalise()
returns trigger language plpgsql as $$
begin
  new.name        := btrim(new.name);
  new.email       := lower(btrim(new.email));
  new.review      := btrim(new.review);
  new.company     := nullif(btrim(coalesce(new.company, '')), '');
  new.designation := nullif(btrim(coalesce(new.designation, '')), '');
  return new;
end $$;

create trigger reviews_normalise_trg
  before insert or update on public.reviews
  for each row execute function public.reviews_normalise();

/* approved_at is derived, never supplied by a client. */
create or replace function public.reviews_stamp_approved()
returns trigger language plpgsql as $$
begin
  if new.status = 'approved' and coalesce(old.status, '') <> 'approved' then
    new.approved_at := now();
  elsif new.status <> 'approved' then
    new.approved_at := null;
  end if;
  return new;
end $$;

create trigger reviews_stamp_approved_trg
  before insert or update on public.reviews
  for each row execute function public.reviews_stamp_approved();

/* Server-side throttle. The browser also throttles, but that is a courtesy;
   this is the one that actually holds. Three submissions per address per day. */
create or replace function public.reviews_rate_limit()
returns trigger language plpgsql security definer set search_path = public as $$
declare recent integer;
begin
  select count(*) into recent
    from public.reviews
   where email = lower(btrim(new.email))
     and created_at > now() - interval '24 hours';
  if recent >= 3 then
    raise exception 'Too many reviews submitted from this address today. Please try again tomorrow.'
      using errcode = 'check_violation';
  end if;
  return new;
end $$;

create trigger reviews_rate_limit_trg
  before insert on public.reviews
  for each row execute function public.reviews_rate_limit();

-- ---------- row level security ----------
alter table public.reviews enable row level security;

/* Anyone may submit, but only as 'pending'. Column privileges below stop the
   status column being supplied at all; this is the belt to that pair of braces. */
create policy reviews_public_insert on public.reviews
  for insert to anon, authenticated
  with check (status = 'pending' and approved_at is null);

/* The public sees approved rows only. Column grants below decide WHICH
   columns; this policy decides which rows. */
create policy reviews_public_read on public.reviews
  for select to anon, authenticated
  using (status = 'approved');

create policy reviews_admin_read   on public.reviews for select to authenticated using (public.is_admin());
create policy reviews_admin_update on public.reviews for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy reviews_admin_delete on public.reviews for delete to authenticated using (public.is_admin());

-- ---------- column privileges ----------
/* RLS filters rows; it cannot hide a column. Email must never leave the
   database for a public visitor, so the public roles are simply not granted
   select on it — no policy mistake can expose it later. */
revoke all on public.reviews from anon, authenticated;

grant insert (name, company, designation, email, review, rating, consent, website)
  on public.reviews to anon, authenticated;

grant select (id, name, company, designation, review, rating, photo_url, created_at, approved_at)
  on public.reviews to anon, authenticated;

/* Moderators need the whole row, including email. Restricted to admins by the
   policies above — a signed-in non-admin matches no admin policy and so still
   sees only approved rows through reviews_public_read. */
grant select (email, status, consent, website) on public.reviews to authenticated;
grant update, delete on public.reviews to authenticated;

grant select on public.admins to authenticated;
