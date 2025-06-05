-- Seed sample data for the instructor dashboard

-- 1. Insert sample locations (Tokyo studios)
INSERT INTO public.locations (business_id, name, name_jp, street_address, street_address_jp, city, city_jp, postal_code, public_phone, public_email, description, description_jp, map_url) VALUES
('paintly-tokyo', 'Paintly Daikanyama', 'ペイントリー代官山', '1-2-3 Daikanyama-cho', '代官山町1-2-3', 'Tokyo', '東京', '150-0034', '+81-3-1234-5678', 'daikanyama@paintly.jp', 'Our flagship studio in trendy Daikanyama', '代官山のフラッグシップスタジオ', 'https://maps.google.com/daikanyama'),
('paintly-tokyo', 'Paintly Ginza', 'ペイントリー銀座', '4-5-6 Ginza', '銀座4-5-6', 'Tokyo', '東京', '104-0061', '+81-3-2345-6789', 'ginza@paintly.jp', 'Premium studio in the heart of Ginza', '銀座の中心部にあるプレミアムスタジオ', 'https://maps.google.com/ginza'),
('paintly-tokyo', 'Paintly Cat Street', 'ペイントリー キャットストリート', '7-8-9 Jingumae', '神宮前7-8-9', 'Tokyo', '東京', '150-0001', '+81-3-3456-7890', 'catstreet@paintly.jp', 'Creative space on famous Cat Street', 'キャットストリートのクリエイティブスペース', 'https://maps.google.com/catstreet'),
('paintly-tokyo', 'Paintly Yokohama', 'ペイントリー横浜', '1-1-1 Minato Mirai', 'みなとみらい1-1-1', 'Yokohama', '横浜', '220-0012', '+81-45-123-4567', 'yokohama@paintly.jp', 'Modern studio with harbor views', 'ハーバービューのモダンスタジオ', 'https://maps.google.com/yokohama'),
('paintly-tokyo', 'Paintly Osaka', 'ペイントリー大阪', '2-3-4 Namba', '難波2-3-4', 'Osaka', '大阪', '542-0076', '+81-6-1234-5678', 'osaka@paintly.jp', 'Vibrant studio in Osaka''s entertainment district', '大阪の繁華街にある活気あるスタジオ', 'https://maps.google.com/osaka'),
('paintly-tokyo', 'Paintly Fukuoka', 'ペイントリー福岡', '5-6-7 Tenjin', '天神5-6-7', 'Fukuoka', '福岡', '810-0001', '+81-92-123-4567', 'fukuoka@paintly.jp', 'Cozy studio in Fukuoka''s city center', '福岡市中心部の居心地の良いスタジオ', 'https://maps.google.com/fukuoka'),
('paintly-tokyo', 'Paintly Okinawa', 'ペイントリー沖縄', '8-9-10 Kokusai-dori', '国際通り8-9-10', 'Naha', '那覇', '900-0013', '+81-98-123-4567', 'okinawa@paintly.jp', 'Tropical paradise studio with ocean inspiration', '海からインスピレーションを得た南国のスタジオ', 'https://maps.google.com/okinawa');

-- 2. Insert sample staff/instructors
INSERT INTO public.staff (business_id, full_name_override, bio, bio_jp, photo_url, is_instructor, is_admin, is_location_manager) VALUES
('paintly-tokyo', 'Luci Martinez', 'Professional art instructor with 8+ years of experience. Specializes in watercolor and acrylic techniques.', '8年以上の経験を持つプロのアート講師。水彩画とアクリル技法を専門としています。', '/images/cathy-avatar.png', true, true, true),
('paintly-tokyo', 'Momo Tanaka', 'Creative director and lead instructor. Expert in mixed media and contemporary art styles.', 'クリエイティブディレクター兼主任講師。ミックスメディアと現代アートスタイルの専門家。', '/images/cathy-avatar.png', true, false, true),
('paintly-tokyo', 'Sakura Yamamoto', 'Traditional Japanese painting specialist with modern twist. Loves teaching beginners.', '現代的なひねりを加えた日本画の専門家。初心者への指導が大好きです。', '/images/cathy-avatar.png', true, false, false),
('paintly-tokyo', 'Alex Chen', 'Digital art and illustration expert. Bridges traditional and digital art techniques.', 'デジタルアートとイラストレーションの専門家。伝統的な技法とデジタル技法を橋渡しします。', '/images/cathy-avatar.png', true, false, false),
('paintly-tokyo', 'Yuki Sato', 'Ceramic and pottery instructor. Creates therapeutic art experiences.', '陶芸講師。セラピー効果のあるアート体験を提供します。', '/images/cathy-avatar.png', true, false, false);

-- 3. Insert event categories
INSERT INTO public.event_categories (business_id, name, name_jp, description, description_jp, color_hex) VALUES
('paintly-tokyo', 'Painting Workshop', 'ペイントワークショップ', 'Traditional and modern painting classes', '伝統的および現代的な絵画クラス', '#FF6B6B'),
('paintly-tokyo', 'Digital Art', 'デジタルアート', 'Digital illustration and design courses', 'デジタルイラストとデザインコース', '#4ECDC4'),
('paintly-tokyo', 'Pottery & Ceramics', '陶芸', 'Hands-on pottery and ceramic workshops', '実践的な陶芸とセラミックワークショップ', '#45B7D1'),
('paintly-tokyo', 'Kids Classes', 'キッズクラス', 'Art classes designed for children', '子供向けに設計されたアートクラス', '#96CEB4'),
('paintly-tokyo', 'Corporate Events', '企業イベント', 'Team building art activities', 'チームビルディングアート活動', '#FFEAA7'),
('paintly-tokyo', 'Private Sessions', 'プライベートセッション', 'One-on-one personalized instruction', 'マンツーマンの個人指導', '#DDA0DD');

-- 4. Insert master event types
INSERT INTO public.master_event_types (business_id, name, name_jp, description, description_jp, default_duration_minutes, default_capacity, default_price) VALUES
('paintly-tokyo', 'Beginner Watercolor', '初心者水彩画', 'Perfect introduction to watercolor painting', '水彩画の完璧な入門コース', 120, 8, 4500.00),
('paintly-tokyo', 'Acrylic Landscape', 'アクリル風景画', 'Learn to paint beautiful landscapes with acrylics', 'アクリルで美しい風景画を学ぶ', 150, 10, 5500.00),
('paintly-tokyo', 'Digital Illustration Basics', 'デジタルイラスト基礎', 'Introduction to digital art tools and techniques', 'デジタルアートツールと技法の紹介', 180, 6, 6500.00),
('paintly-tokyo', 'Pottery Wheel Workshop', '陶芸ろくろワークショップ', 'Hands-on pottery wheel experience', '実践的なろくろ体験', 120, 6, 7000.00),
('paintly-tokyo', 'Kids Art Adventure', 'キッズアート冒険', 'Fun and creative art session for children', '子供向けの楽しくクリエイティブなアートセッション', 90, 12, 3000.00),
('paintly-tokyo', 'Corporate Team Building', '企業チームビルディング', 'Collaborative art project for teams', 'チーム向けの共同アートプロジェクト', 180, 20, 8000.00);

-- 5. Insert sample events (next 2 weeks)
INSERT INTO public.events (
  business_id, 
  master_event_type_id, 
  event_category_id, 
  location_id, 
  instructor_id, 
  title, 
  title_jp, 
  description, 
  description_jp, 
  price, 
  capacity, 
  start_time, 
  end_time, 
  is_published
) 
SELECT 
  'paintly-tokyo',
  met.id,
  ec.id,
  l.id,
  s.user_id,
  met.name,
  met.name_jp,
  met.description,
  met.description_jp,
  met.default_price,
  met.default_capacity,
  -- Generate events for the next 14 days
  NOW() + (INTERVAL '1 day' * generate_series(1, 14)) + (INTERVAL '1 hour' * (10 + (random() * 8)::int)),
  NOW() + (INTERVAL '1 day' * generate_series(1, 14)) + (INTERVAL '1 hour' * (10 + (random() * 8)::int)) + (INTERVAL '1 minute' * met.default_duration_minutes),
  true
FROM 
  public.master_event_types met
  CROSS JOIN public.event_categories ec
  CROSS JOIN public.locations l
  CROSS JOIN public.staff s
WHERE 
  met.business_id = 'paintly-tokyo'
  AND ec.business_id = 'paintly-tokyo'
  AND l.business_id = 'paintly-tokyo'
  AND s.business_id = 'paintly-tokyo'
  AND s.is_instructor = true
  AND random() < 0.3 -- Only create 30% of possible combinations to avoid too many events
LIMIT 50; -- Limit to 50 events

-- 6. Insert sample bookings
INSERT INTO public.event_bookings (
  event_id,
  customer_name,
  customer_email,
  customer_phone,
  booking_status,
  payment_status,
  booking_notes
)
SELECT 
  e.id,
  CASE (random() * 10)::int
    WHEN 0 THEN 'Tanaka Hiroshi'
    WHEN 1 THEN 'Smith Jennifer'
    WHEN 2 THEN 'Yamada Yuki'
    WHEN 3 THEN 'Johnson Michael'
    WHEN 4 THEN 'Sato Akiko'
    WHEN 5 THEN 'Brown Sarah'
    WHEN 6 THEN 'Watanabe Kenji'
    WHEN 7 THEN 'Davis Emma'
    WHEN 8 THEN 'Suzuki Mari'
    ELSE 'Wilson James'
  END,
  CASE (random() * 10)::int
    WHEN 0 THEN 'tanaka.h@email.com'
    WHEN 1 THEN 'jennifer.smith@email.com'
    WHEN 2 THEN 'yamada.yuki@email.com'
    WHEN 3 THEN 'michael.johnson@email.com'
    WHEN 4 THEN 'sato.akiko@email.com'
    WHEN 5 THEN 'sarah.brown@email.com'
    WHEN 6 THEN 'watanabe.k@email.com'
    WHEN 7 THEN 'emma.davis@email.com'
    WHEN 8 THEN 'suzuki.mari@email.com'
    ELSE 'james.wilson@email.com'
  END,
  '+81-' || (70 + (random() * 20)::int) || '-' || (1000 + (random() * 9000)::int) || '-' || (1000 + (random() * 9000)::int),
  CASE (random() * 4)::int
    WHEN 0 THEN 'confirmed'
    WHEN 1 THEN 'confirmed'
    WHEN 2 THEN 'confirmed'
    ELSE 'completed'
  END,
  CASE (random() * 3)::int
    WHEN 0 THEN 'paid'
    WHEN 1 THEN 'paid'
    ELSE 'pending'
  END,
  CASE (random() * 5)::int
    WHEN 0 THEN 'First time student'
    WHEN 1 THEN 'Returning customer'
    WHEN 2 THEN 'Birthday celebration'
    WHEN 3 THEN 'Gift certificate booking'
    ELSE NULL
  END
FROM public.events e
WHERE random() < 0.7 -- 70% of events have at least one booking
LIMIT 100;

-- Verify the data was inserted
SELECT 
  'locations' as table_name, COUNT(*) as record_count FROM public.locations
UNION ALL
SELECT 
  'staff' as table_name, COUNT(*) as record_count FROM public.staff
UNION ALL
SELECT 
  'event_categories' as table_name, COUNT(*) as record_count FROM public.event_categories
UNION ALL
SELECT 
  'master_event_types' as table_name, COUNT(*) as record_count FROM public.master_event_types
UNION ALL
SELECT 
  'events' as table_name, COUNT(*) as record_count FROM public.events
UNION ALL
SELECT 
  'event_bookings' as table_name, COUNT(*) as record_count FROM public.event_bookings
ORDER BY table_name;
