import { NestFactory } from "@nestjs/core";

import AppModule from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { downloadSpigotBuildTools } from "./cron/jobs/updatespigot.job";

async function bootstrap()
{
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    );
    
    await app.listen(80);
}

bootstrap();
