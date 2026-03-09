-- Add admin user
-- IMPORTANT: Replace 'your-email@gmail.com' with your actual Google account email
-- The PIN code is set to 162-8280 as requested

INSERT INTO admin_users (email, pin_code, is_active) VALUES
('admin@example.com', '162-8280', true)
ON CONFLICT (email) DO UPDATE SET pin_code = '162-8280', is_active = true;

-- Note: After running this script, update the email above to match your Google account email
-- You can run: UPDATE admin_users SET email = 'your-actual-email@gmail.com' WHERE email = 'admin@example.com';
