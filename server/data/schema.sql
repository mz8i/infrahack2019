CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    author VARCHAR(100) NOT NULL,
    image_url VARCHAR(1000) NOT NULL,
    image_position POINT NOT NULL,
    image_time TIMESTAMP NOT NULL,
    company VARCHAR(500),
    comment VARCHAR(1000)
)

CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    boundary GEOMETRY NOT NULL
)