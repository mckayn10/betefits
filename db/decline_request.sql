UPDATE Bets
SET resolved = true, accepted = false
WHERE id = $1;