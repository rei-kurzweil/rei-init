-- Seed data for users and items
-- This file can be applied after the initial schema migration

-- Insert some test users
INSERT INTO users (email, username, password_hash, name, config) VALUES 
  ('rei.trace.me@gmail.com', 'rei-cast.xyz', 'hashed_password_1', '⚡Rei Evans_', '{"theme": "dark", "notifications": true}'),
  ('toresu@example.com', 'toresu', 'hashed_password_2', 'Toresu Rei', '{"theme": "light", "notifications": false}'),
  ('rii@example.com', 'rii', 'hashed_password_3', 'Rii Init', '{"theme": "auto", "lang": "en"}');

-- Insert some test items
INSERT INTO items (from_user_id, to_user_ids, content, content_type, x, y, z) VALUES
  (1, '[]', '...1 sec', 'application/json', 0.0, 0.0, 0.0);
  