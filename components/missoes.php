<?php
require_once __DIR__ . '/config.php';
header('Content-Type: application/json');
$headers = getallheaders();
$auth = isset($headers['Authorization']) ? $headers['Authorization'] : (isset($headers['authorization']) ? $headers['authorization'] : '');
if (!preg_match('/Bearer\s(\S+)/', $auth, $matches)) {
	http_response_code(401);
	echo json_encode(['message' => 'Token não enviado']);
	exit;
}
$token = $matches[1];
$stmt = $pdo->prepare('SELECT * FROM users WHERE auth_token = ?');
$stmt->execute([$token]);
$user = $stmt->fetch();
if (!$user) {
	http_response_code(401);
	echo json_encode(['message' => 'Token inválido']);
	exit;
}
// Exemplo de missões
$missoes = [
	['id' => 1, 'titulo' => 'Primeira Missão', 'descricao' => 'Complete seu perfil'],
	['id' => 2, 'titulo' => 'Segunda Missão', 'descricao' => 'Faça seu primeiro post']
];
echo json_encode(['missoes' => $missoes]);
