#bin/sh

mkdir -p /var/log
touch php7.3-fpm.log
chmod 777 php7.3-fpm.log && chown www-data:www-data php7.3-fpm.log

mkdir -p /home/www && chown www-data:www-data /home/www && chmod 744 /home/www