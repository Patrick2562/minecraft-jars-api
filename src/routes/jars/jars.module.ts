import { Module } from "@nestjs/common";

import JarsService from "./jars.service";
import JarsController from "./jars.controller";

@Module({
    providers: [
        JarsService
    ],
    controllers: [
        JarsController
    ]
})
export default class JarsModule { }
