import { createHash } from "crypto";
import * as path from "path";
import parse from "node-html-parser";

import JarDto, { JarType } from "src/routes/jars/dto/jar.dto";
import Scraper, { ScraperResult } from "./scraper";
import { validateJarVersion } from "src/utils/validate";
import SpigotHandler from "../handlers/spigot.handler";

export default class SpigotScraper extends Scraper {
    public PROJECT_NAME: JarType = JarType.spigot;

    public async scrape(): Promise<ScraperResult[]>
    {
        let res  = await fetch("https://hub.spigotmc.org/versions");
        let html = await res.text();

        let root       = parse(html);
        let links_html = root.querySelector("pre").textContent;
        
        let links_root = parse(links_html);
        let links      = links_root.querySelectorAll("a");
        
        let list: ScraperResult[] = [];

        for (let link of links) {
            let href    = link.getAttribute("href");
            let version = path.basename(href, ".json");
            
            if (! await validateJarVersion(version))
                continue;

            let latest_build = await this.fetchLatestBuild(version);

            if (! latest_build.javaVersion)
                continue;

            let jar = new JarDto();
            jar.identifier = latest_build.identifier;
            jar.type       = this.PROJECT_NAME;
            jar.version    = version;

            list.push({
                dto:         jar,
                handler:     SpigotHandler,
                javaVersion: latest_build.javaVersion
            });
        }
        
        return list;
    }

    protected async fetchLatestBuild(version: string)
    {    
        let res   = await fetch(`https://hub.spigotmc.org/versions/${version}.json`);
        let build = await res.json();

        let javaVersion = build.javaVersions
            ? this.getAvailableJavaVersionForJar(build.javaVersions)
            : 8;

        return {
            identifier:  this.getIdentifier(version, build.refs.Spigot),
            javaVersion: javaVersion
        };
    }

    public getIdentifier(version: string, build_ref: string): string
    {
        return createHash("sha1")
            .update(`${this.PROJECT_NAME}_${version}_${build_ref}`)
            .digest("hex");
    }

    protected getAvailableJavaVersionForJar([min_ver, max_ver]: [number, number]): number | null
    {
        let availableVersions = [
            { java_version: 8,  class_version: 52 },
            { java_version: 17, class_version: 61 },
            { java_version: 21, class_version: 65 }
        ];

        for (let v of availableVersions) {
            if (v.class_version >= min_ver && v.class_version <= max_ver) {
                return v.java_version;
            }
        }

        return null;
    }
}
