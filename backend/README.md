# php-react
Symfony backend with react frontend

### First boot with docker
1. in host console, execute:
```
docker-compose up
```
2. in host console, execute:
```
docker-compose exec php-fpm bash
```
3. in the container console:
```
composer install
```
5. connect from mysqladmin docker to docker mysql:
server: mysql
user:root
pwd:docker_root


### First boot in local environment
1. install php 7
2. install mysql and a mysql client
3. run
```
compose install
```
4. connect to mysql database


### Database setup
1. Only if working with local database
    1. create user
    ```
        user:sf4_user
        pwd:sf4_pw
    ```

    2. create database sf4_db
    3. execute script db/script.sql

    4. grant user sf4_user to manage sf4_db

2. log in docker php-fpm and execute
```
php bin/console doctrine:schema:update --force

```

### How to develop

#### Api response format
```
https://jsonapi.org/
```


#### Sources

from:
https://medium.com/@joeymasip/how-to-create-an-api-with-symfony-4-and-jwt-b2334a8fbec2


- react 
https://www.thinktocode.com/2018/06/21/symfony-4-and-reactjs/
https://auth0.com/blog/developing-modern-apps-with-symfony-and-react/