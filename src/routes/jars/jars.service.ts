import { Injectable } from "@nestjs/common";

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
}
