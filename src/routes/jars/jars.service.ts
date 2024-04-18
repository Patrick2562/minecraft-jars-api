import { Injectable } from "@nestjs/common";
import * as path from "path";

import { JarType } from "./dto/jar.dto";
import PrismaService from "src/prisma/prisma.service";

@Injectable()
export default class JarsService
{
    constructor(
        private prisma: PrismaService
    ) { }

    public async getTypes()
    {
        let list = await this.prisma.jar.groupBy({
            by: [ "type" ]
        });

        return list.map(v => v.type);
    }

    public async getVersions(type: JarType)
    {
        let list = await this.prisma.jar.findMany({
            where: {
                type: type
            },
            select: {
                version: true
            }
        });

        return list.map(v => v.version);
    }

    public async getFilePath(type: JarType, version: string): Promise<string | null>
    {
        let jar = await this.prisma.jar.findFirst({
            where: {
                type:    type,
                version: version
            },
            select: {
                fileName: true
            }
        });

        if (! jar)
            return null;

        return path.resolve(process.env.JARS_DIR, type, jar.fileName);
    }
}
