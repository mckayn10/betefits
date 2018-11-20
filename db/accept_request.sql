UPDATE Bets
SET resolved = true, accepted = true
WHERE id = $1;