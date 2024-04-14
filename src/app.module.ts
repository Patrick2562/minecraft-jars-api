import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

import PrismaModule from "./prisma/prisma.module";
import CronsModule from "./cron/crons.module";
import JarsModule from "src/routes/jars/jars.module";
import { downloadSpigotBuildTools } from "./cron/jobs/updatespigot.job";
import ScraperService from "./scraper/scraper.service";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath:  path.join(__dirname, "../public"),
            serveRoot: "/"
        }),
        PrismaModule,
        CronsModule,
        JarsModule
    ],
    providers: [
        ScraperService
    ],
    controllers: []

})
export default class AppModule {
    constructor(
        protected ScrapeService: ScraperService
    ) {
        this.init();
    }

    private async init()
    {
        await downloadSpigotBuildTools();
        await this.ScrapeService.scrapeAll();
    }
}
