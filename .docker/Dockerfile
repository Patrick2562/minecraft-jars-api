FROM node:20

WORKDIR /home/node/app

# JAVA 8
RUN mkdir -p /home/node/java/8 && \
    wget -c https://api.adoptium.net/v3/binary/latest/8/ga/linux/x64/jdk/hotspot/normal/eclipse -O - | \
    tar xvz --directory /home/node/java/8 --strip-components=1

# JAVA 17
RUN mkdir -p /home/node/java/17 && \
    wget -c https://api.adoptium.net/v3/binary/latest/17/ga/linux/x64/jdk/hotspot/normal/eclipse -O - | \
    tar xvz --directory /home/node/java/17 --strip-components=1

# JAVA 21
RUN mkdir -p /home/node/java/21 && \
    wget -c https://api.adoptium.net/v3/binary/latest/21/ga/linux/x64/jdk/hotspot/normal/eclipse -O - | \
    tar xvz --directory /home/node/java/21 --strip-components=1

EXPOSE 80

COPY .docker/entrypoint.sh /entrypoint.sh
CMD ["/bin/bash", "/entrypoint.sh"]
