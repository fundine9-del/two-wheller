-- Run once in Supabase SQL Editor to enable editable Home-page content.
create table if not exists public.home_content (
  id uuid primary key default uuid_generate_v4(),
  hero_image text,
  hero_eyebrow text,
  hero_title text,
  hero_subtitle text,
  updated_at timestamptz not null default now()
);
alter table public.home_content enable row level security;
create policy "Public can view home content" on public.home_content for select using (true);
create policy "Admins manage home content" on public.home_content for all to authenticated using (public.is_admin()) with check (public.is_admin());
