INSERT INTO `users`(`name`, `surname`, `email`, `gender`) VALUES ('admin', 'admin', 'admin@example.com', 'M');
INSERT INTO `credentials`(`userId`, `username`, `password`, `role`) VALUES ((select id from users where email='admin@example.com'), 'admin', '$argon2i$v=19$m=65536,t=4,p=1$U2gyb0pzamYyQy96cGdhRg$kqmoNb5rVLm3+0bFs2t4yJSvhOuoRzjVNY8pOrL62GU', 'A');

INSERT INTO `users`(`name`, `surname`, `email`, `gender`) VALUES ('user', 'user', 'user@example.com', 'M')