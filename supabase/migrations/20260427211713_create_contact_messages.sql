/*
  # Create Contact Messages Table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text, sender's full name)
      - `email` (text, sender's email)
      - `subject` (text, message subject)
      - `message` (text, message body)
      - `created_at` (timestamptz, when message was submitted)

  2. Security
    - Enable RLS on `contact_messages` table
    - Allow anonymous users to INSERT (public contact form)
    - No SELECT policy for anonymous users (messages are private to owner)
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  subject text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact message"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name <> '' AND
    email <> '' AND
    message <> ''
  );
