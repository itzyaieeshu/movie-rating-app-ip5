psql -h localhost -f sql/migrations/create_db.sql
psql -h localhost -d movie_rating_project5 -f sql/migrations/create_users.sql
psql -h localhost -d movie_rating_project5 -f sql/migrations/create_ratings.sql