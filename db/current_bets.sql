SELECT * FROM Bets 
WHERE creator_id = $1 OR sent_to = $1
AND resolved = true 
AND accepted = true;