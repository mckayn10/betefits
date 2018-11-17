SELECT * FROM Bets 
WHERE creator_id = $1 AND offer = true;