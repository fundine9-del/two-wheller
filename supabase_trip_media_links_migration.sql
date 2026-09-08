-- Run once in Supabase SQL Editor to add photo/video links for archived (past) trips.
alter table public.trips add column if not exists photos_link text;
alter table public.trips add column if not exists videos_link text;