-- Estrutura da tabela `users`
CREATE TABLE IF NOT EXISTS `users` (
	`id` INT AUTO_INCREMENT PRIMARY KEY,
	`full_name` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL UNIQUE,
	`password` VARCHAR(255) NOT NULL,
	`auth_token` VARCHAR(128) DEFAULT NULL,
	`user_type` VARCHAR(32) DEFAULT 'user',
	`is_vetted` TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Estrutura da tabela `missoes` (opcional, exemplo)
CREATE TABLE IF NOT EXISTS `missoes` (
	`id` INT AUTO_INCREMENT PRIMARY KEY,
	`titulo` VARCHAR(255) NOT NULL,
	`descricao` TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;