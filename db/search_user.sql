SELECT * FROM Users
WHERE username LIKE CONCAT($1, '%')