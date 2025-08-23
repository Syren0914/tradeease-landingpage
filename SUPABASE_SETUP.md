# Supabase Setup for Waitlist

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key from the project settings

## 2. Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Create Waitlist Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create waitlist table
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  solutions TEXT NOT NULL,
  features TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for waitlist signup)
CREATE POLICY "Allow waitlist inserts" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reads (for admin dashboard if needed)
CREATE POLICY "Allow waitlist reads" ON waitlist
  FOR SELECT USING (true);

-- Create index on email for faster lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);

-- Create index on created_at for sorting
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at);
```

## 4. Optional: Create Admin View

If you want to view waitlist entries, create this view:

```sql
-- Create a view for admin dashboard
CREATE VIEW waitlist_summary AS
SELECT 
  id,
  first_name,
  last_name,
  email,
  business_name,
  industry,
  solutions,
  features,
  created_at,
  CONCAT(first_name, ' ', last_name) as full_name
FROM waitlist
ORDER BY created_at DESC;
```

## 5. Test the Integration

1. Start your development server: `npm run dev`
2. Click "Join Waitlist" and fill out the form
3. Check your Supabase dashboard to see the new entry

## API Endpoints

- `POST /api/waitlist` - Submit waitlist entry
  - Body: `{ firstName, lastName, email, businessName, industry, solutions, features }`
  - Returns: `{ message, data }` on success
  - Returns: `{ error }` on failure

## Error Handling

The system handles:
- Duplicate email addresses
- Invalid email formats
- Missing required fields
- Database connection errors
- Network errors

## Security Features

- Row Level Security enabled
- Email uniqueness enforced
- Input validation
- SQL injection protection via Supabase client
