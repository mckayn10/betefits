INSERT INTO Bets (bet_title, bet_details, amount, creator_id, offer, resolved, accepted)
VALUES ($1, $2, $3, $4, $5, false, 'false')

RETURNING *