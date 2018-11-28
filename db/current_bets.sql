SELECT * FROM Bets
Where (creator_id = $1 OR sent_to = $1)
AND (resolved = true and accepted = true)