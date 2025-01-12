-- Create profiles table
create table profiles (
    id uuid references auth.users on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    username text unique not null,
    display_name text,
    avatar_url text,
    primary key (id)
);

-- Create email_addresses table
create table email_addresses (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    address text unique not null,
    user_id uuid references auth.users on delete cascade not null,
    is_primary boolean default false not null,
    is_verified boolean default false not null,
    expires_at timestamp with time zone,
    constraint unique_primary_address unique (user_id, is_primary)
);

-- Create emails table
create table emails (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    recipient_address text references email_addresses(address) on delete cascade not null,
    sender_address text not null,
    subject text not null,
    body_html text,
    body_text text,
    read_at timestamp with time zone,
    spam_score numeric default 0 not null,
    is_spam boolean default false not null,
    headers jsonb default '{}'::jsonb not null,
    attachments jsonb[] default array[]::jsonb[] not null
);

-- Create indexes
create index idx_profiles_username on profiles using btree (username);
create index idx_email_addresses_user_id on email_addresses using btree (user_id);
create index idx_email_addresses_address on email_addresses using btree (address);
create index idx_emails_recipient_address on emails using btree (recipient_address);
create index idx_emails_created_at on emails using btree (created_at);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table email_addresses enable row level security;
alter table emails enable row level security;

-- Create policies
create policy "Users can view their own profile"
    on profiles for select
    using (auth.uid() = id);

create policy "Users can update their own profile"
    on profiles for update
    using (auth.uid() = id);

create policy "Users can view their own email addresses"
    on email_addresses for select
    using (auth.uid() = user_id);

create policy "Users can insert their own email addresses"
    on email_addresses for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own email addresses"
    on email_addresses for update
    using (auth.uid() = user_id);

create policy "Users can delete their own email addresses"
    on email_addresses for delete
    using (auth.uid() = user_id);

create policy "Users can view emails sent to their addresses"
    on emails for select
    using (
        exists (
            select 1
            from email_addresses
            where email_addresses.address = emails.recipient_address
            and email_addresses.user_id = auth.uid()
        )
    );

-- Create functions
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
    insert into public.profiles (id, username)
    values (new.id, new.email);
    return new;
end;
$$;

-- Create triggers
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user(); 