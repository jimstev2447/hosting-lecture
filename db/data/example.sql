DROP DATABASE IF EXISTS nc_snacks;
CREATE DATABASE nc_snacks;

-- \c nc_snacks;

CREATE TABLE vending_machines
(
  vend_id SERIAL PRIMARY KEY,
  vend_location VARCHAR(100),
  date_last_stocked DATE,
  cost_of_machine INT
);

INSERT INTO vending_machines
  (vend_location, date_last_stocked, cost_of_machine)
VALUES
  ('Manchester', '2022-12-24', 10000),
  ('Leeds', '2023-01-05', 10000),
  ('Birmingham', '2022-10-31', 20000);

CREATE TABLE snack_categories
(
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(40),
  category_description TEXT
);

INSERT INTO snack_categories
  (category_name, category_description)
VALUES
  ('biscuit', 'aint biscuits brillaint'),
  ('chocolate bar', 'whats better than a biscuite ... chocolate'),
  ('drink', 'thirst quenching'),
  ('fruit', 'get your 7 a day in!');

SELECT *
FROM snack_categories;

CREATE TABLE snacks
(
  snack_id SERIAL PRIMARY KEY,
  snack_name VARCHAR(30),
  price INT,
  snack_description TEXT,
  category_id INT REFERENCES snack_categories(category_id)
);

INSERT INTO snacks
  (snack_name, price, snack_description, category_id)
VALUES
  ('hobnobs', 100, 'a delicious biscuit', 1),
  ('kitkat', 150, 'is it really a chocloate bar?', 2),
  ('cola', 120, 'fizzy good make feel nice', 3),
  ('water', 90, 'a healthy option', 3),
  ('custard cream', 100, 'un classique', 1),
  ('apple', 200, 'one a day', 4),
  ('boost', 120, 'the best chocolate bar', 2);


CREATE TABLE vend_snacks
(
  vend_snack_id SERIAL PRIMARY KEY,
  vend_id INT REFERENCES vending_machines(vend_id),
  snack_id INT REFERENCES snacks(snack_id)
);

INSERT INTO vend_snacks
  (vend_id, snack_id)
VALUES
  (1, 1),
  (1, 3),
  (1, 4),
  (2, 1),
  (2, 2),
  (2, 3),
  (3, 5),
  (3, 6),
  (3, 7),
  (3, 4);

SELECT vending_machines.vend_location, snacks.snack_name
FROM vending_machines
  JOIN vend_snacks
  ON vending_machines.vend_id = vend_snacks.vend_id
  JOIN snacks
  ON vend_snacks.snack_id = snacks.snack_id
WHERE vending_machines.vend_id = 2;

SELECT category_name, SUM(snacks.price) AS total_cost
FROM snack_categories
  JOIN snacks ON snack_categories.category_id = snacks.category_id
GROUP BY snack_categories.category_id;