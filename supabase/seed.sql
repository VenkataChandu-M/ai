-- Database Seed script
-- NOTE: In production, do not run seed scripts that contain hardcoded IDs unless they map to known dev user UUIDs.

INSERT INTO contacts (id, user_id, full_name, email, company, phone, status) VALUES
('b39f4001-fbd2-4916-bd80-2a781b4d0812', '00000000-0000-0000-0000-000000000000', 'John Doe', 'john@acme.com', 'Acme Corp', '555-0100', 'customer'),
('4d92bdcc-3121-4f76-8051-5120a109a13b', '00000000-0000-0000-0000-000000000000', 'Jane Smith', 'jane@startup.io', 'Startup IO', '555-0101', 'lead');

INSERT INTO deals (id, user_id, contact_id, title, value, stage) VALUES
('59cba678-b118-4a69-8071-ae628b05615d', '00000000-0000-0000-0000-000000000000', 'b39f4001-fbd2-4916-bd80-2a781b4d0812', 'Acme Q3 Software License', 15000.00, 'won'),
('c5e3f438-e4b7-4dbf-9dfd-a8321e25e985', '00000000-0000-0000-0000-000000000000', '4d92bdcc-3121-4f76-8051-5120a109a13b', 'Startup Implementation Plan', 5000.00, 'negotiation');

INSERT INTO campaigns (user_id, name, channel, budget, spent, leads_generated, status) VALUES
('00000000-0000-0000-0000-000000000000', 'Q3 B2B Lead Gen', 'email', 2000.00, 1500.00, 42, 'active'),
('00000000-0000-0000-0000-000000000000', 'Tech Conf Sponsorship', 'ads', 5000.00, 5000.00, 120, 'completed');

INSERT INTO events (user_id, title, event_date, event_time, duration_min, location, status) VALUES
('00000000-0000-0000-0000-000000000000', 'Product Demo - Acme Corp', CURRENT_DATE + INTERVAL '2 days', '10:00', 60, 'Zoom', 'upcoming'),
('00000000-0000-0000-0000-000000000000', 'Follow up call - Startup IO', CURRENT_DATE + INTERVAL '5 days', '14:30', 30, 'Phone', 'upcoming');
