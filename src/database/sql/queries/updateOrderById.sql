UPDATE orders
SET status = $2
WHERE id = $1
RETURNING *