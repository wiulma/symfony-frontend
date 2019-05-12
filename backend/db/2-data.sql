INSERT INTO `users`(`name`, `surname`, `email`, `gender`) VALUES ('admin', 'admin', 'admin@example.com', 'M');
INSERT INTO `credentials`(`userId`, `username`, `password`, `role`) VALUES ((select id from users where email='admin@example.com'), 'admin', 'admin', 'A');

INSERT INTO `users`(`name`, `surname`, `email`, `gender`) VALUES ('user', 'user', 'user@example.com', 'M')