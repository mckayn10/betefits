INSERT INTO Users (email, username, password, amount_made, amount_lost)
VALUES ($1, $2, $3, 0, 0)

RETURNING *

