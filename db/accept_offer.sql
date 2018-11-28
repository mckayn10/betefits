UPDATE Bets
SET resolved = true, accepted = true, sent_to = $2, sent_to_username = $3
WHERE id = $1;