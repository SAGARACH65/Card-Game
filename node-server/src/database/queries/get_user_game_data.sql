SELECT 
  ug.cards_generated,
  ug.game_status,
  ug.hands_dealt,
  ug.is_winner,
  gs.winner_card,
  gs.cards_dealt_in_one_hand
FROM user_games ug
INNER JOIN games g ON g.id = ug.game_id
INNER JOIN game_settings gs ON gs.game_id = ug.game_id
WHERE ug.id = :userGameId
