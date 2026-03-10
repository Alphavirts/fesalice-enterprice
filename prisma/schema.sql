-- Fesalice Enterprise SIM Distribution System Schema

-- Profiles for users
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  username text unique,
  role text default 'user' check (role in ('admin', 'user')),
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SIM Batches
create table batches (
  id text primary key, -- e.g. BATCH-001
  date_received timestamp with time zone default timezone('utc'::text, now()) not null,
  total_sims integer not null,
  remaining_sims integer not null,
  status text default 'Full' check (status in ('Full', 'In Use', 'Depleted', 'Critical')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Clients
create table clients (
  id text primary key, -- e.g. CLI-001
  name text not null,
  email text unique,
  phone text,
  total_distributed integer default 0,
  status text default 'Active' check (status in ('Active', 'Inactive')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Individual SIMs (optional but good for tracking ICCIDs)
create table sims (
  iccid text primary key,
  msisdn text,
  batch_id text references batches(id) on delete cascade,
  client_id text references clients(id),
  status text default 'In Stock' check (status in ('In Stock', 'Distributed', 'Registered')),
  distributed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Distributions
create table distributions (
  id uuid default gen_random_uuid() primary key,
  client_id text references clients(id),
  batch_id text references batches(id),
  count integer not null,
  otp_verified boolean default false,
  distributed_by uuid references profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Activity Logs
create table activity_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  action text not null,
  details text,
  entity_type text, -- 'batch', 'client', 'distribution'
  entity_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table profiles enable row level security;
alter table batches enable row level security;
alter table clients enable row level security;
alter table sims enable row level security;
alter table distributions enable row level security;
alter table activity_logs enable row level security;

-- Policies (Simplified for demo, usually more granular)
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

create policy "All authenticated users can view inventory." on batches for select using (auth.role() = 'authenticated');
create policy "Only admins can manage batches." on batches for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Triggers for remaining_sims and client totals
create or replace function update_inventory_on_distribution()
returns trigger as $$
begin
  update batches 
  set remaining_sims = remaining_sims - new.count,
      status = case 
        when remaining_sims - new.count <= 0 then 'Depleted'
        when remaining_sims - new.count < 10 then 'Critical'
        else 'In Use'
      end
  where id = new.batch_id;
  
  update clients
  set total_distributed = total_distributed + new.count
  where id = new.client_id;
  
  return new;
end;
$$ language plpgsql;

create trigger distribution_trigger
after insert on distributions
for each row execute function update_inventory_on_distribution();
