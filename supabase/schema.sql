-- ============================================================
-- WALTER ZANNONI — Database Supabase pronto all'uso
-- Incolla tutto in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- 1. PROFILI UTENTE (collegati a Supabase Auth)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  phone text,
  role text not null default 'cliente' check (role in ('cliente', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Ognuno vede il proprio profilo"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Ognuno aggiorna il proprio profilo"
  on public.profiles for update
  using (auth.uid() = id);

-- Crea automaticamente il profilo quando un utente si registra
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- 2. PROGETTI DEL PORTFOLIO
create table if not exists public.projects (
  id bigint generated always as identity primary key,
  title text not null,
  tag text not null,
  description text,
  image_url text,
  price_label text,              -- es. "da €1.499" — lo decidi tu
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Tutti vedono i progetti pubblicati"
  on public.projects for select
  using (published = true);

create policy "Solo admin modifica i progetti"
  on public.projects for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));


-- 3. LISTINO PREZZI
create table if not exists public.pricing_plans (
  id bigint generated always as identity primary key,
  name text not null,            -- es. "Sito Vetrina"
  description text,
  price_from numeric(10,2) not null,
  unit text not null default 'una tantum',
  features jsonb not null default '[]',   -- lista di stringhe
  highlight boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.pricing_plans enable row level security;

create policy "Tutti vedono il listino pubblicato"
  on public.pricing_plans for select
  using (published = true);

create policy "Solo admin modifica il listino"
  on public.pricing_plans for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));


-- 4. RICHIESTE PREVENTIVO / CONTATTI
create table if not exists public.quote_requests (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  plan text,                     -- piano scelto (facoltativo)
  message text not null,
  status text not null default 'nuova' check (status in ('nuova', 'letta', 'in_lavorazione', 'chiusa')),
  created_at timestamptz not null default now()
);

alter table public.quote_requests enable row level security;

create policy "Chiunque può inviare una richiesta"
  on public.quote_requests for insert
  with check (true);

create policy "Utente vede le proprie richieste"
  on public.quote_requests for select
  using (auth.uid() = user_id);

create policy "Solo admin vede e gestisce tutte le richieste"
  on public.quote_requests for all
  using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));


-- 5. DATI INIZIALI: i 9 progetti del portfolio
insert into public.projects (title, tag, description, image_url, sort_order) values
  ('Nova Analytics', 'Web App · SaaS', 'Dashboard analytics in dark mode con grafici in tempo reale, KPI e reportistica avanzata.', '/projects/dashboard.png', 1),
  ('Atelier Milano', 'E-commerce', 'Store di lusso con catalogo editoriale, checkout ottimizzato e design minimal di alto livello.', '/projects/ecommerce.png', 2),
  ('Synapse AI', 'Intelligenza Artificiale', 'Assistente conversazionale con interfaccia neon, memoria contestuale e risposte in streaming.', '/projects/aichat.png', 3),
  ('PulseFit', 'Mobile App', 'App fitness con tracking degli allenamenti, statistiche e piani personalizzati.', '/projects/mobileapp.png', 4),
  ('Immobilia', 'Piattaforma Web', 'Portale immobiliare con ricerca su mappa, schede proprietà e filtri intelligenti.', '/projects/realestate.png', 5),
  ('Osteria Novecento', 'Sito Ristorante', 'Sito elegante per ristorante con menù digitale, prenotazione tavoli e galleria dei piatti.', '/projects/ristorante.png', 6),
  ('Marechiaro Resort', 'Booking Engine', 'Piattaforma di prenotazione per resort con ricerca per date, camere con prezzi e checkout.', '/projects/hotel.png', 7),
  ('Konto', 'Fintech · Web App', 'Dashboard bancaria stile neobank con saldo, movimenti, grafici delle spese e carte virtuali.', '/projects/fintech.png', 8),
  ('Luca Ferri — Fotografia', 'Portfolio', 'Portfolio artistico per fotografo con galleria a tutto schermo e tipografia minimale.', '/projects/fotografo.png', 9);

-- 6. DATI INIZIALI: listino (modifica i prezzi come vuoi)
insert into public.pricing_plans (name, description, price_from, features, highlight, sort_order) values
  ('Sito Vetrina', 'Perfetto per presentarti al mondo con stile.', 499,
   '["Sito one-page con design esclusivo","Responsive: perfetto su ogni dispositivo","SEO di base e velocità ottimizzata","Modulo contatti e social integrati","Consegna in 7 giorni"]', false, 1),
  ('Web App / E-commerce', 'La scelta giusta per vendere e gestire tutto online.', 1499,
   '["Tutto del piano Vetrina","Database e backend dedicati","Area riservata con login e registrazione","Catalogo prodotti e gestione ordini","Dashboard amministrativa","Consegna in 3 settimane"]', true, 2),
  ('Soluzione AI', 'Per chi vuole il futuro, oggi.', 2999,
   '["Tutto del piano Web App","Chatbot / assistente AI personalizzato","Automazioni intelligenti sui tuoi processi","Integrazione con i tuoi strumenti","Addestramento sui tuoi dati","Supporto prioritario 12 mesi"]', false, 3);

-- Fatto! Per renderti admin, dopo esserti registrato esegui:
-- update public.profiles set role = 'admin' where id = 'IL-TUO-USER-ID';
