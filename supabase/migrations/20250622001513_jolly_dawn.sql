-- Insert sample users
INSERT INTO users (login, password, profile, created_at, updated_at) VALUES
('admin', 'admin', 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('manager', 'manager', 'CLUB_MANAGER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('player', 'player', 'PLAYER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample competitions
INSERT INTO competitions (name, created_at, updated_at) VALUES
('Spring Championship 2024', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Summer League 2024', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Winter Tournament 2024', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample clubs
INSERT INTO clubs (name, address, contact_mail, contact_tel, created_at, updated_at) VALUES
('Tennis Club A', '123 Tennis Street, City A', 'contact@cluba.com', '+1-555-0101', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Tennis Club B', '456 Sports Avenue, City B', 'info@clubb.com', '+1-555-0102', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Tennis Club C', '789 Court Road, City C', 'hello@clubc.com', '+1-555-0103', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample halls
INSERT INTO hall (name, location, created_at, updated_at) VALUES
('Center Court', 'Main Tennis Complex, Downtown', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Court A', 'Sports Center, North Wing', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Court B', 'Tennis Academy, Building A', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample players
INSERT INTO players (first_name, last_name, birthday, license, club_id, users_id, created_at, updated_at) VALUES
('John', 'Smith', '1995-03-15', 'LIC001', 1, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Jane', 'Doe', '1992-07-22', 'LIC002', 1, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Mike', 'Johnson', '1988-11-10', 'LIC003', 2, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Sarah', 'Davis', '1990-05-18', 'LIC004', 2, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample members
INSERT INTO members (first_name, last_name, function, clubs_id, contact_mail, contact_tel, users_id, created_at, updated_at) VALUES
('Robert', 'Manager', 'PRESIDENT', 1, 'robert@cluba.com', '+1-555-0201', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Lisa', 'Coach', 'COACH', 2, 'lisa@clubb.com', '+1-555-0202', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample matches
INSERT INTO matches (competitions_id, club1_id, club2_id, players11_id, players12_id, players21_id, players22_id, hall_id, score1, score2, created_at, updated_at) VALUES
(1, 1, 2, 1, 2, 3, 4, 1, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 3, 1, 2, NULL, NULL, 2, NULL, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 3, 3, 4, NULL, NULL, 3, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample sets
INSERT INTO sets (matches_id, score1, score2, created_at, updated_at) VALUES
(1, 6, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 6, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);