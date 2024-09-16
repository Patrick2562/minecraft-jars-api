#!/bin/bash

if [ $APP_ENV == "development" ]; then
    echo "Started in development mode."
    sleep infinity

else
    echo "Started in production mode."
    npm install
    npx prisma migrate deploy
    npm run build
    npm run prod
fi
