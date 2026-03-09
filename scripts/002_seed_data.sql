-- Seed initial data for nail salon

-- Insert service categories and services
INSERT INTO services (name, description, price, duration_minutes, category, display_order) VALUES
-- Manicures
('Classic Manicure', 'Traditional manicure with nail shaping, cuticle care, and polish', 25.00, 30, 'Manicures', 1),
('Gel Manicure', 'Long-lasting gel polish with chip-free shine for up to 2 weeks', 45.00, 45, 'Manicures', 2),
('Luxury Spa Manicure', 'Premium manicure with exfoliation, mask, hot towel, and massage', 55.00, 60, 'Manicures', 3),
('Dip Powder Manicure', 'Durable dip powder application for lasting color and strength', 50.00, 50, 'Manicures', 4),

-- Pedicures
('Classic Pedicure', 'Relaxing pedicure with foot soak, exfoliation, and polish', 35.00, 45, 'Pedicures', 5),
('Gel Pedicure', 'Long-lasting gel polish pedicure with extended wear', 55.00, 60, 'Pedicures', 6),
('Luxury Spa Pedicure', 'Indulgent pedicure with paraffin wax, extended massage, and mask', 75.00, 75, 'Pedicures', 7),
('Hot Stone Pedicure', 'Therapeutic pedicure with hot stone massage for ultimate relaxation', 85.00, 90, 'Pedicures', 8),

-- Nail Art
('Simple Nail Art', 'Elegant designs on 2 accent nails', 10.00, 15, 'Nail Art', 9),
('Full Set Nail Art', 'Custom artistic designs on all nails', 25.00, 30, 'Nail Art', 10),
('3D Nail Art', 'Stunning 3D embellishments and intricate designs', 40.00, 45, 'Nail Art', 11),
('Chrome/Holographic', 'Mirror chrome or holographic powder finish', 15.00, 20, 'Nail Art', 12),

-- Enhancements
('Acrylic Full Set', 'Full set of acrylic nail extensions', 65.00, 75, 'Enhancements', 13),
('Acrylic Fill', 'Maintenance fill for existing acrylic nails', 45.00, 45, 'Enhancements', 14),
('Gel Extensions', 'Natural-looking gel nail extensions', 75.00, 90, 'Enhancements', 15),
('Nail Repair', 'Single nail repair or replacement', 8.00, 15, 'Enhancements', 16);

-- Insert specials
INSERT INTO specials (title, description, original_price, special_price, discount_percentage, valid_from, valid_until, is_active) VALUES
('New Client Special', 'First-time visitors receive 20% off any service. Use code WELCOME20 at booking.', 50.00, 40.00, 20, CURRENT_DATE, CURRENT_DATE + INTERVAL '1 year', true),
('Mani-Pedi Combo', 'Save $15 when you book a manicure and pedicure together. Perfect pampering package!', 80.00, 65.00, 19, CURRENT_DATE, CURRENT_DATE + INTERVAL '6 months', true),
('Refer a Friend', 'Both you and your friend receive $10 off your next visit when they book.', NULL, 10.00, NULL, CURRENT_DATE, CURRENT_DATE + INTERVAL '1 year', true),
('Birthday Beauty', 'Enjoy 25% off during your birthday month with proof of ID. Treat yourself!', 60.00, 45.00, 25, CURRENT_DATE, CURRENT_DATE + INTERVAL '1 year', true);

-- Insert sample nail gallery items
INSERT INTO nail_gallery (title, slug, description, image_url, customer_name, customer_review, rating, service_name, price, tags, meta_title, meta_description, is_published) VALUES
('Elegant French Tips', 'elegant-french-tips', 'Classic French manicure with a modern twist featuring soft pink base and crisp white tips. Perfect for any occasion from weddings to everyday elegance.', '/images/gallery/french-tips.jpg', 'Sarah M.', 'Absolutely love my French tips! The technician was so careful and precise. They lasted for 3 weeks without chipping. Will definitely be back!', 5, 'Gel Manicure', 45.00, ARRAY['french', 'classic', 'elegant', 'wedding'], 'Elegant French Tips Nail Design | Luxe Nail Studio', 'Beautiful French tip manicure with soft pink base and crisp white tips. See our customer review and get inspired for your next nail appointment.', true),
('Rose Gold Chrome Nails', 'rose-gold-chrome-nails', 'Stunning rose gold chrome finish with mirror-like shine. A showstopping look that catches the light beautifully from every angle.', '/images/gallery/rose-gold-chrome.jpg', 'Jennifer L.', 'These nails are GORGEOUS! I get compliments everywhere I go. The chrome finish is flawless and the shape is perfect. This salon is amazing!', 5, 'Chrome/Holographic', 60.00, ARRAY['chrome', 'rose gold', 'metallic', 'trendy'], 'Rose Gold Chrome Nails | Luxe Nail Studio', 'Stunning rose gold chrome nail design with mirror-like finish. Read our customer review and book your chrome nail appointment today.', true),
('Floral Garden Art', 'floral-garden-art', 'Delicate hand-painted floral designs featuring roses and leaves on a soft nude base. Each nail is a tiny work of art.', '/images/gallery/floral-art.jpg', 'Michelle K.', 'The nail artist here is incredibly talented! My floral nails looked like something out of a magazine. So many people asked where I got them done.', 5, 'Full Set Nail Art', 70.00, ARRAY['floral', 'hand-painted', 'artistic', 'roses'], 'Floral Garden Nail Art | Luxe Nail Studio', 'Exquisite hand-painted floral nail art featuring delicate roses and leaves. See our customer review and book your nail art appointment.', true),
('Ombre Sunset Gradient', 'ombre-sunset-gradient', 'Beautiful gradient from coral to pink creating a sunset-inspired look. Smooth blending technique for a seamless transition.', '/images/gallery/ombre-sunset.jpg', 'Amanda R.', 'The ombre effect is so smooth and professional. I came in with a Pinterest photo and they recreated it perfectly. Highly recommend!', 5, 'Gel Manicure', 55.00, ARRAY['ombre', 'gradient', 'sunset', 'coral', 'pink'], 'Ombre Sunset Gradient Nails | Luxe Nail Studio', 'Beautiful ombre sunset gradient nail design with smooth coral to pink blending. Read the review and get inspired for your next visit.', true),
('Marble Luxe Design', 'marble-luxe-design', 'Sophisticated marble effect with gold veining on a white base. Luxury meets artistry in this stunning design.', '/images/gallery/marble-luxe.jpg', 'Christina P.', 'I wanted something unique for my engagement photos and these marble nails were perfect! The gold accents make them look so expensive.', 5, 'Full Set Nail Art', 75.00, ARRAY['marble', 'gold', 'luxury', 'white', 'engagement'], 'Marble Luxe Nail Design | Luxe Nail Studio', 'Sophisticated marble nail design with elegant gold veining. Perfect for special occasions. See our customer review and book today.', true),
('Minimalist Line Art', 'minimalist-line-art', 'Clean and modern line art designs on natural pink base. Simple yet striking geometric patterns.', '/images/gallery/line-art.jpg', 'Emily W.', 'Finally found a salon that understands minimalist nail art! These are exactly what I wanted - subtle but stylish. Great attention to detail.', 4, 'Simple Nail Art', 35.00, ARRAY['minimalist', 'line art', 'geometric', 'modern', 'simple'], 'Minimalist Line Art Nails | Luxe Nail Studio', 'Clean and modern minimalist line art nail design. Simple yet striking geometric patterns. Read the review and book your appointment.', true);

-- Insert site settings
INSERT INTO site_settings (key, value) VALUES
('salon_name', 'Luxe Nail Studio'),
('salon_tagline', 'Where Beauty Meets Artistry'),
('salon_phone', '(555) 123-4567'),
('salon_email', 'hello@luxenailstudio.com'),
('salon_address', '123 Beauty Lane, Suite 100, Los Angeles, CA 90001'),
('booking_url', 'https://booking.luxenailstudio.com'),
('instagram_url', 'https://instagram.com/luxenailstudio'),
('business_hours', '{"monday":"9:00 AM - 7:00 PM","tuesday":"9:00 AM - 7:00 PM","wednesday":"9:00 AM - 7:00 PM","thursday":"9:00 AM - 8:00 PM","friday":"9:00 AM - 8:00 PM","saturday":"9:00 AM - 6:00 PM","sunday":"10:00 AM - 5:00 PM"}'),
('meta_description', 'Luxe Nail Studio offers premium manicures, pedicures, and nail art in Los Angeles. Expert technicians, luxurious atmosphere, and stunning results.'),
('meta_keywords', 'nail salon, manicure, pedicure, nail art, gel nails, acrylic nails, Los Angeles, luxury nail spa');
