-- Create services table for pricing menu
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER,
  category TEXT NOT NULL DEFAULT 'general',
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create specials table for promotional offers
CREATE TABLE IF NOT EXISTS specials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  original_price DECIMAL(10,2),
  special_price DECIMAL(10,2) NOT NULL,
  discount_percentage INTEGER,
  valid_from DATE,
  valid_until DATE,
  is_active BOOLEAN DEFAULT true,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create nail_gallery table for SEO nail reviews
CREATE TABLE IF NOT EXISTS nail_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  customer_name TEXT,
  customer_review TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  service_name TEXT,
  price DECIMAL(10,2),
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin_users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  pin_code TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create site_settings table for general site configuration
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE specials ENABLE ROW LEVEL SECURITY;
ALTER TABLE nail_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can read published content)
CREATE POLICY "Public can view active services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active specials" ON specials FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view published gallery" ON nail_gallery FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);

-- Admin policies using service role (authenticated admins can do everything)
CREATE POLICY "Admin full access services" ON services FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin full access specials" ON specials FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin full access gallery" ON nail_gallery FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin full access admin_users" ON admin_users FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL USING (auth.role() = 'service_role');

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_nail_gallery_slug ON nail_gallery(slug);
CREATE INDEX IF NOT EXISTS idx_nail_gallery_published ON nail_gallery(is_published);
CREATE INDEX IF NOT EXISTS idx_specials_active ON specials(is_active);
