
import JarDto, { JarType } from "src/routes/jars/dto/jar.dto";
import Scraper, { ScraperResult } from "./scraper";
import DownloadHandler from "../handlers/download.handler";
import { version } from "os";

export default class BungeeCordScraper extends Scraper {
    public PROJECT_NAME: JarType = JarType.bungeecord;

    public async scrape(): Promise<ScraperResult[]>
    {
        let res  = await fetch("https://ci.md-5.net/job/BungeeCord/lastBuild/api/json");
        let data = await res.json();

        if (data.result !== "SUCCESS")
            return [];

        let latest_build = data.actions.find(v => v._class === "hudson.plugins.git.util.BuildData");

        if (! latest_build)
            return [];
        
        let jarName = data.artifacts.find(v => v.displayPath === "BungeeCord.jar").relativePath;

        let jar = new JarDto();
        jar.identifier = latest_build.lastBuiltRevision.SHA1;
        jar.type       = this.PROJECT_NAME;
        jar.version    = "BungeeCord";
        jar.fileName   = `${this.PROJECT_NAME}.jar`;

        return [
            {
                dto:         jar,
                downloadUrl: `https://ci.md-5.net/job/BungeeCord/lastSuccessfulBuild/artifact/${jarName}`,
                handler:     DownloadHandler
            }
        ];
    }
}
