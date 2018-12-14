INSERT INTO Bets (bet_title, bet_details, amount, creator_id, offer, resolved, creator_username, bet_ends)
VALUES ($1, $2, $3, $4, $5, false, $6, $7)

RETURNING *