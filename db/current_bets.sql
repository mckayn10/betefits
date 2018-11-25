SELECT * FROM Bets
INNER JOIN Users ON Users.id = Bets.creator_id
WHERE (creator_id = $1 OR sent_to = $1)
AND (resolved = true AND accepted = true);