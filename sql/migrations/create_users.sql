DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    user_id serial primary key,
    firstname text not null,
    lastname text not null,
    email text not null,
    password text not null
);