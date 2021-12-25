SELECT 
  u.id,
  u.username,
  u.email,
  (
    SELECT ug.id
    FROM user_games ug
    WHERE ug.user_id = u.id 
      AND ug.game_status <> 'COMPLETED'
  ) AS uncompleted_games
FROM users u
WHERE u.id = :userId
