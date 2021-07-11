DROP TABLE IF EXISTS ratings;

CREATE TABLE IF NOT EXISTS ratings (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <=5), 
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
);

