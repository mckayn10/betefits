UPDATE Users
SET amount_made = amount_made + $2
WHERE id = $1;