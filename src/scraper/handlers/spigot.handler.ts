import { spawn } from "child_process";

import { ScraperResult } from "../scrapers/scraper";

export default abstract class SpigotHandler {
    private static getJavaExecutableByClassVersion(class_version: number)
    {
        switch(class_version)
        {
        }
    }
    
    public static handle(data: ScraperResult): Promise<boolean>
    {
        return new Promise(resolve => {
            console.log(`[${data.dto.type}] [${data.dto.version}] Building jar file . . .`);

            const child = spawn(`/home/node/java/${data.javaVersion}/bin/java`, [
                "-jar", "BuildTools.jar", "--rev", data.dto.version, "--o", `${process.env.JARS_DIR}/${data.dto.type}`, "--final-name", `${data.dto.version}.jar`
            ], {
                cwd: "/home/node/spigot"
            });
            
            child.on("exit", code => {
                if (code !== 0) {
                    console.log(`[${data.dto.type}] [${data.dto.version}] Failed to build ${data.dto.version} jar`);
                    resolve(false);
                }
                
                console.log(`[${data.dto.type}] [${data.dto.version}] Downloaded and builded`);
                resolve(true);
            });

            /* child.stdout.on("data", data => {
                console.log(data.toString()); 
            }); */
        });
    }
}
