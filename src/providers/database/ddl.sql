CREATE TABLE IF NOT EXISTS account(
  id int PRIMARY KEY AUTO_INCREMENT,
  branch text,
  bank text,
  type text,
  balance numeric(8,2),
  currency text),
);

CREATE TABLE IF NOT EXISTS bill (
  date integer,
  payee text,
  amount numeric(8,2),
  repeat text,
  paid tinyint,
  CONSTRAINT prim PRIMARY KEY(date, payee)
);

CREATE TABLE IF NOT EXISTS category (
  code int PRIMARY KEY AUTOINCREMENT,
  name text
);

CREATE TABLE IF NOT EXISTS transactions (
  id int PRIMARY KEY AUTOINCREMENT,
  amount NUMERIC(5,2),
  currency text,
  date DATE,
  description text,
  account INTEGER,
  category text,
  type text,
  CONSTRAINT acc FOREIGN KEY(account) REFERENCES account(id) ON DELETE SET NULL ON UPDATE CASCADE
  CONSTRAINT cat FOREIGN KEY(category) REFERENCES category(code) ON DELETE SET NULL ON UPDATE CASCADE
);
