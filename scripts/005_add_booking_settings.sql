-- Add booking URL and contact settings
INSERT INTO site_settings (key, value)
VALUES 
  ('booking_url', '/booking'),
  ('phone', '(555) 123-4567'),
  ('email', 'hello@luxenailstudio.com'),
  ('address', '123 Beauty Lane, Suite 100, Los Angeles, CA 90210'),
  ('salon_name', 'Nails Touch'),
  ('tagline', 'Where Beauty Meets Artistry'),
  ('hours', 'Mon-Sat: 9AM-7PM, Sun: 10AM-5PM')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
