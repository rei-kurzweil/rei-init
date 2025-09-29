-- Seed data for users and items
-- This file can be applied after the initial schema migration

-- Insert some test users
INSERT INTO users (email, username, password_hash, name, config) VALUES 
  ('rei@example.com', 'rei', 'hashed_password_1', 'Rei', '{"theme": "dark", "notifications": true}'),
  ('toresu@example.com', 'toresu', 'hashed_password_2', 'Toresu Rei', '{"theme": "light", "notifications": false}'),
  ('rii@example.com', 'rii', 'hashed_password_3', 'Rii Init', '{"theme": "auto", "lang": "en"}');

-- Insert some test items
INSERT INTO items (from_user_id, to_user_ids, content, content_type, x, y, z) VALUES
  (1, '[2,3]', '{"type": "message", "text": "Hello from Rei!", "timestamp": "2025-09-28T00:00:00Z"}', 'application/json', 0.0, 0.0, 0.0),
  (2, '[1]', '{"type": "reply", "text": "Hi Rei! Nice to meet you.", "replyTo": 1}', 'application/json', 1.0, 0.0, 0.0),
  (1, '[2,3]', '{"type": "location", "name": "Virtual Space", "coordinates": [1.5, 2.0, 0.5]}', 'application/json', 1.5, 2.0, 0.5),
  (3, '[1,2]', '{"type": "invite", "event": "VR Meeting", "datetime": "2025-09-28T15:00:00Z"}', 'application/json', 0.0, 1.0, 1.0);