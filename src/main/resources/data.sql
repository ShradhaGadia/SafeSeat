-- Insert sample users
INSERT INTO users (id, name, gender, email, phone) VALUES (1, 'Priya Sharma', 'FEMALE', 'priya@example.com', '9876543210');
INSERT INTO users (id, name, gender, email, phone) VALUES (2, 'Rahul Verma', 'MALE', 'rahul@example.com', '9876543211');
INSERT INTO users (id, name, gender, email, phone) VALUES (3, 'Anita Desai', 'FEMALE', 'anita@example.com', '9876543212');

-- Insert sample seats for a train-like layout
-- Section: Sleeper, seats numbered 1-72, arranged in bays of 6 seats (lower, middle, upper) on both sides of aisle.
-- For simplicity, we'll just create a few seats with row and column.
-- We'll define column as 'L' (left), 'M' (middle), 'U' (upper) maybe? But we used char column.
-- Let's use column as 'A', 'B', 'C' etc. and row as bay number.
-- We'll create a small set for testing.

-- Sleeper section
INSERT INTO seats (id, seat_number, row, column, is_available, section, seat_type, version) VALUES (1, '1L', 1, 'L', true, 'Sleeper', 'LOWER', 0);
INSERT INTO seats (id, seat_number, row, column, is_available, section, seat_type, version) VALUES (2, '1M', 1, 'M', true, 'Sleeper', 'MIDDLE', 0);
INSERT INTO seats (id, seat_number, row, column, is_available, section, seat_type, version) VALUES (3, '1U', 1, 'U', true, 'Sleeper', 'UPPER', 0);
INSERT INTO seats (id, seat_number, row, column, is_available, section, seat_type, version) VALUES (4, '2L', 2, 'L', true, 'Sleeper', 'LOWER', 0);
INSERT INTO seats (id, seat_number, row, column, is_available, section, seat_type, version) VALUES (5, '2M', 2, 'M', true, 'Sleeper', 'MIDDLE', 0);
INSERT INTO seats (id, seat_number, row, column, is_available, section, seat_type, version) VALUES (6, '2U', 2, 'U', true, 'Sleeper', 'UPPER', 0);
INSERT INTO seats (id, seat_number, row, column, is_available, section, seat_type, version) VALUES (7, '3L', 3, 'L', true, 'Sleeper', 'LOWER', 0);
INSERT INTO seats (id, seat_number, row, column, is_available, section, seat_type, version) VALUES (8, '3M', 3, 'M', true, 'Sleeper', 'MIDDLE', 0);
INSERT INTO seats (id, seat_number, row, column, is_available, section, seat_type, version) VALUES (9, '3U', 3, 'U', true, 'Sleeper', 'UPPER', 0);

-- AC section
INSERT INTO seats (id, seat_number, row, column, is_available, section, seat_type, version) VALUES (10, '1A', 1, 'A', true, 'AC', 'WINDOW', 0);
INSERT INTO seats (id, seat_number, row, column, is_available, section, seat_type, version) VALUES (11, '1B', 1, 'B', true, 'AC', 'AISLE', 0);
INSERT INTO seats (id, seat_number, row, column, is_available, section, seat_type, version) VALUES (12, '2A', 2, 'A', true, 'AC', 'WINDOW', 0);
INSERT INTO seats (id, seat_number, row, column, is_available, section, seat_type, version) VALUES (13, '2B', 2, 'B', true, 'AC', 'AISLE', 0);