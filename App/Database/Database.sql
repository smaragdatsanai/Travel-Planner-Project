-- Create a table for storing website user information
CREATE TABLE USER (
  user_id INTEGER PRIMARY KEY,
  username TEXT,
  email TEXT,
  password TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for storing travel plan information
CREATE TABLE PLAN (
  plan_id INTEGER PRIMARY KEY,
  user_id INTEGER,
  plan_name TEXT,
  destination TEXT,
  start_date DATE,
  end_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create a table for storing flight information
CREATE TABLE FLIGHT (
  flight_id INTEGER PRIMARY KEY,
  plan_id INTEGER,
  airline TEXT,
  flight_number TEXT,
  departure_date DATE,
  departure_time TIME,
  arrival_date DATE,
  arrival_time TIME,
  departure_airport TEXT,
  arrival_airport TEXT,
  FOREIGN KEY (plan_id) REFERENCES plans(plan_id)
);

-- Create a table for storing accommodation information
CREATE TABLE ACCOMMODATION (
  accommodation_id INTEGER PRIMARY KEY,
  plan_id INTEGER,
  name TEXT,
  check_in_date DATE,
  check_in_time TIME,
  check_out_date DATE,
  check_out_time TIME,
  location TEXT,
  FOREIGN KEY (plan_id) REFERENCES plans(plan_id)
);

-- Create a table for storing activity information
CREATE TABLE ACTIVITIES(
  activity_id INTEGER PRIMARY KEY,
  plan_id INTEGER,
  name TEXT,
  date DATE,
  start_time TIME,
  end_time TIME,
  location TEXT,
  FOREIGN KEY (plan_id) REFERENCES plans(plan_id)
);
