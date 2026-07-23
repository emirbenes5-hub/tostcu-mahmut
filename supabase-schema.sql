-- Supabase SQL editöründe bir kere çalıştır.

create table if not exists ziyaretler (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now()
);

create table if not exists etkilesimler (
  id bigint generated always as identity primary key,
  tur text not null check (tur in ('kategori', 'urun')),
  kategori_id text,
  urun_adi text,
  created_at timestamptz not null default now()
);

create table if not exists aboneler (
  id bigint generated always as identity primary key,
  email text not null,
  google_sub text not null unique,
  created_at timestamptz not null default now()
);
