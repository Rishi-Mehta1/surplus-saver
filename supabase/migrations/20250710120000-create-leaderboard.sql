-- Create leaderboard table
create table if not exists leaderboard (
  id uuid primary key default gen_random_uuid(),
  user_name text not null,
  score integer not null default 0,
  level integer not null default 1,
  avatar_url text
);

-- Insert demo data
insert into leaderboard (user_name, score, level, avatar_url) values
  ('Alice', 1200, 5, 'https://randomuser.me/api/portraits/women/1.jpg'),
  ('Bob', 950, 4, 'https://randomuser.me/api/portraits/men/2.jpg'),
  ('Charlie', 800, 3, 'https://randomuser.me/api/portraits/men/3.jpg'),
  ('Diana', 700, 3, 'https://randomuser.me/api/portraits/women/4.jpg'); 