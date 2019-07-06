# php-react
Symfony backend API

### First boot with docker (recommended)
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

4. create db tables
```
php bin/console doctrine:schema:update --force
```

5. connect from mysqladmin docker to docker mysql:
```
http://localhost:8001/
```

```
server: mysql
user:root
pwd:docker_root
```

6. Create example data
execute SQL script in
```
db/2-data.sql
```

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
        user:sample_user
        pwd:sample_pw
    ```

    2. create database sample
    3. execute scripts
        - db/1-init.sql
        - db/2-data.sql

    4. grant user sample_user to manage sample

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

TODO:
https://github.com/zircote/swagger-php