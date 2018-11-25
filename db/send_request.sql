INSERT INTO Bets (bet_title, bet_details, amount, creator_id, offer, sent_to, resolved,
 creator_username, sent_to_username)
VALUES ($1, $2, $3, $4, false, $5, false, $6, $7 )