CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  hours VARCHAR(64),
  description TEXT,
  icon VARCHAR(64) DEFAULT 'BookOpen',
  badge VARCHAR(64),
  sort_order INTEGER DEFAULT 0,
  enabled BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO courses (title, hours, description, icon, badge, sort_order) VALUES
('Парковочный', '4 часа', 'Научим ставить машину даже там, где, кажется, нет места. Параллельная, перпендикулярная, задним ходом — как королева парковки', 'CircleParking', NULL, 1),
('Магистральный', '4 часа', 'Перестроения, скорости, трассы. Больше никакого страха перед оживлённым потоком', 'Route', NULL, 2),
('Кольца города', '4 часа', 'Круговое движение в Симферополе (кольцо на Маршала Жукова, площадь Куйбышева и др.). Правильно, красиво, безопасно', 'RefreshCw', NULL, 3),
('Экзаменационный', '4 часа', 'Отработка маршрутов ГИБДД Симферополя. Никаких сюрпризов на экзамене', 'ClipboardCheck', 'НОВИНКА', 4),
('Пробный экзамен', '2 часа', 'Репетиция с экзаменационной атмосферой', 'GraduationCap', NULL, 5);