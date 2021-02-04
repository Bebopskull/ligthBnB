INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO users(name, email, password) 
VALUES ('a', 'a@arasaka.js', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('b', 'b@arasaka.js', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('c', 'c@arasaka.js', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties(owner_id, title, description, thumbnail_photo_url, cover_photo_url,corst_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, city, province, post_code,active) 
VALUES (1, 'prop1', 'description', 'url', 'cover_photo_url', 10, 0, 1, 1, 'canada', 'toronto', 'ontario', '123 abx', true),
(2, 'prop2', 'description', 'thumbnail_photo_url', 'cover_photo_url', 10, 0, 1, 1, 'canada', 'toronto', 'ontario', '123 abx', true),
(3, 'prop3', 'description', 'thumbnail_photo_url', 'cover_photo_url', 10, 0, 1, 1, 'canada', 'toronto', 'ontario', '123 abx', true);
   
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 1, 3, 5, 'message'),
(2, 2, 3, 5, 'message'),
(3, 3, 3, 5, 'message');