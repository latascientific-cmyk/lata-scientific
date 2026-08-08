/* =========================================================
   LATA SCIENTIFIC — switch the review status vocabulary
   Applied to Supabase project yoqdsrwnwcdwzdcyemjl.

   Moderation now happens by hand in the Supabase Table Editor, so there is no
   admin panel and no admin login. The dashboard connects as a privileged role
   and bypasses Row Level Security, which means the browser needs no update or
   delete permission at all — and after this migration it has none.

     pending      submitted, never shown
     published    visible in the Client Trust section
     unpublished  taken back down, no longer shown
   ========================================================= */

alter table public.reviews drop constraint if exists reviews_status_enum;

update public.reviews set status = 'published'   where status = 'approved';
update public.reviews set status = 'unpublished' where status = 'rejected';

alter table public.reviews
  add constraint reviews_status_enum check (status in ('pending', 'published', 'unpublished'));

-- ---------- public read: published only ----------
drop policy if exists reviews_public_read on public.reviews;
create policy reviews_public_read on public.reviews
  for select to anon, authenticated
  using (status = 'published');

-- approved_at now records when the review was published, and is cleared again
-- if it is taken back down.
create or replace function public.reviews_stamp_approved()
returns trigger language plpgsql set search_path = public as $$
begin
  if new.status = 'published' and coalesce(old.status, '') <> 'published' then
    new.approved_at := now();
  elsif new.status <> 'published' then
    new.approved_at := null;
  end if;
  return new;
end $$;

-- ---------- remove the admin-panel machinery ----------
drop policy if exists reviews_admin_read   on public.reviews;
drop policy if exists reviews_admin_update on public.reviews;
drop policy if exists reviews_admin_delete on public.reviews;

revoke update, delete on public.reviews from authenticated;
revoke select (email, status, consent, website) on public.reviews from authenticated;

drop policy if exists admins_self_read on public.admins;
drop function if exists public.is_admin();
drop table if exists public.admins;
