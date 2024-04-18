import { Controller, Get, Param, Req, Res, StreamableFile } from "@nestjs/common";
import { IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";
import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";

import JarsService from "./jars.service";
import { JarName, JarType } from "./dto/jar.dto";

export class DownloadParams
{
    @IsEnum(JarType)
    type: JarType;

    @IsString()
    @Matches(/^\d(\.\d{1,2})?\.\d{1,2}$/)
    @IsNotEmpty()
    version: string;
}

@Controller("jar")
export default class JarsController
{
    constructor(
        private JarsService: JarsService
    ) {
        // 
    }

    @Get("/types")
    async getTypes(@Req() req: Request)
    {
        let baseUrl = `${req.protocol}://${req.hostname}`;
        let types   = await this.JarsService.getTypes();

        return types.map(type => {
            return {
                type:    type,
                name:    JarName[type],
                logoUrl: `${baseUrl}/images/logos/${type}.png`
            };
        });
    }

    @Get("/:type/versions")
    async getVersions(@Param("type") type: JarType)
    {
        if (! JarType[type])
            return false;

        return await this.JarsService.getVersions(type);
    }

    @Get("/:type/:version/download")
    async download(@Res({ passthrough: true }) res: Response, @Param() params: DownloadParams)
    {
        const filePath = await this.JarsService.getFilePath(params.type, params.version);
        const fileName = path.basename(filePath);
        const file     = fs.createReadStream(filePath);

        res.set({
            "Content-Type":        "application/java-archive",
            "Content-Disposition": `attachment; filename="${fileName}"`,
        });

        return new StreamableFile(file);
    }
}
