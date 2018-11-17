SELECT * FROM Bets 
WHERE sent_to = $1 AND resolved = false AND offer = false;