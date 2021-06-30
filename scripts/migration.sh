psql -h localhost -f sql/migrations/create_db.sql
psql -h localhost -d movie_rating_app_db -f sql/migrations/create_users.sql