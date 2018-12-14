UPDATE Users
SET amount_lost = amount_lost + $2
WHERE id = $1