FROM phpdockerio/php73-fpm:latest

WORKDIR "/application"

# Install selected extensions and other stuff
RUN apt-get update \
    && apt-get -y --no-install-recommends install php7.3-mysql php-xdebug php7.3-intl \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# Install git
RUN apt-get update \
    && apt-get -y install git \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# Install git flow
RUN apt-get update \
    && apt-get install git-flow

COPY setup.sh .

RUN chmod +x setup.sh

RUN ./setup.sh
