<?php
require_once __DIR__ . '/config.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['email'], $data['password'], $data['full_name'])) {
	http_response_code(400);
	echo json_encode(['message' => 'Dados incompletos']);
	exit;
}
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$full_name = $data['full_name'];
try {
	$stmt = $pdo->prepare('INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)');
	$stmt->execute([$email, $password, $full_name]);
	echo json_encode(['message' => 'Cadastro realizado com sucesso']);
} catch (PDOException $e) {
	if ($e->getCode() == 23000) {
		http_response_code(409);
		echo json_encode(['message' => 'Email já cadastrado']);
	} else {
		http_response_code(500);
		echo json_encode(['message' => 'Erro ao cadastrar', 'error' => $e->getMessage()]);
	}
}
