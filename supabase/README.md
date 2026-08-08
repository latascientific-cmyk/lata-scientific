# Customer review system

Real reviews only. Nothing reaches the website until you publish it by hand.

```
customer  →  review form  →  reviews table (status = 'pending')  →  not shown
                                        │
                        you set status in the Supabase Table Editor
                                        │
                        'published'   →  appears in Client Trust
                        'unpublished' →  disappears again
```

Project: **`yoqdsrwnwcdwzdcyemjl`** (ap-south-1).

## How to publish a review

1. Supabase dashboard → **Table Editor** → `reviews`
2. Find the row (newest first by `created_at`; `status` will be `pending`)
3. Change **`status`** to `published`
4. Reload the site — it appears in Client Trust

To take one back down, set `status` to `unpublished`. It is gone from the site
on the next page load. Nothing else needs changing; `approved_at` is stamped and
cleared automatically by a trigger.

Only these three values are accepted — anything else is rejected by a CHECK
constraint:

| status | meaning |
|---|---|
| `pending` | submitted, never shown (the default) |
| `published` | live in the Client Trust section |
| `unpublished` | taken down, no longer shown |

## Where things live

| Piece | File |
|---|---|
| Client Trust section | `index.html` (empty state) + `assets/js/reviews.js` |
| Review form | `review.html` + `assets/js/review-form.js` |
| Connection details | `assets/js/supabase-config.js` *(generated)* |
| Environment values | `.env` *(gitignored)* — template in `.env.example` |
| Config generator | `scripts/gen-supabase-config.mjs` |
| Styling for the new parts | `assets/css/reviews.css` |
| Schema and policies | `supabase/migrations/` |

There is no admin panel and no admin login — moderation is the dashboard.

## Configuration

Values live in `.env`, not in code:

```bash
node scripts/gen-supabase-config.mjs
```

That reads `.env` (or real environment variables, which win) and writes
`assets/js/supabase-config.js`.

That generated file **is** committed, and has to be: the site is static HTML
served straight from the repository, so there is no build step or server able to
substitute a value at request time. This is safe — the publishable key is a
public project identifier and every permission it has is decided by Row Level
Security. The generator refuses to write a `service_role` key, which would
bypass RLS and must stay in the dashboard only.

## What the database enforces

Browser checks are a courtesy. These hold even if someone calls the API
directly with the publishable key:

- a review can only be inserted as `pending` — the public role has **no
  privilege on the `status` column**, so it cannot be set at submission time
- the public role **cannot read `email`** on any row, published or not
- the public role can only read rows where `status = 'published'`
- **no browser role has UPDATE or DELETE at all** — publishing is possible only
  from the dashboard, which connects as a privileged role
- name, email format, rating range and review length are re-checked by CHECK
  constraints
- the honeypot column must be empty
- three submissions per email address per 24 hours

## Adding email notifications later

Not implemented — the site is static and has no mail service. The clean way to
add it is a Supabase Edge Function on an insert webhook, with no front-end
change. The row already carries name, company, rating, review and `created_at`.
