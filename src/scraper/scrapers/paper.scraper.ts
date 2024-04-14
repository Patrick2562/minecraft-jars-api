import { createHash } from "crypto";

import { validateJarVersion } from "src/utils/validate";
import JarDto, { JarType } from "src/routes/jars/dto/jar.dto";
import Scraper, { ScraperResult } from "./scraper";
import DownloadHandler from "../handlers/download.handler";

export default class PaperScraper extends Scraper {
    public PROJECT_NAME: JarType = JarType.paper;
    protected BASE_URL: string   = "https://api.papermc.io/v2/projects";

    public async scrape(): Promise<ScraperResult[]>
    {
        let res     = await fetch(`${this.BASE_URL}/${this.PROJECT_NAME}`);
        let project = await res.json();

        let list: ScraperResult[] = [];

        for (let version of project.versions) {
            if (! await validateJarVersion(version))
                continue;
            
            let latest_build = await this.fetchLatestBuild(version);
            
            let jar = new JarDto();
            jar.identifier = latest_build.identifier;
            jar.type       = this.PROJECT_NAME;
            jar.version    = version;
            
            list.push({
                dto:         jar,
                downloadUrl: latest_build.downloadUrl,
                handler:     DownloadHandler
            });
        }

        return list;
    }

    protected async fetchLatestBuild(version: string)
    {    
        let res  = await fetch(`${this.BASE_URL}/${this.PROJECT_NAME}/versions/${version}/builds`);
        let data = await res.json();

        let latest_build = data.builds.pop();

        return {
            identifier:  this.getIdentifier(version, latest_build.build),
            downloadUrl: this.formatDownloadUrl(version, latest_build.build, latest_build.downloads.application.name)
        };
    }

    protected formatDownloadUrl(version: string, build_number: number, artifact_name: string): string
    {
        return `${this.BASE_URL}/${this.PROJECT_NAME}/versions/${version}/builds/${build_number}/downloads/${artifact_name}`;
    }

    public getIdentifier(version: string, build_number: number): string
    {
        return createHash("sha1")
            .update(`${this.PROJECT_NAME}_${version}_${build_number}`)
            .digest("hex");
    }
}
