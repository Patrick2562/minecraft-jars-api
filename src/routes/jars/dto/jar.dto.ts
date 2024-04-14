import { IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";

export enum JarType {
    vanilla    = "vanilla",
    purpur     = "purpur",
    paper      = "paper",
    spigot     = "spigot",
    folia      = "folia",
    velocity   = "velocity",
    bungeecord = "bungeecord",
    forge      = "forge",
    fabric     = "fabric",
    mohist     = "mohist"
}

export enum JarName {
    vanilla    = "Vanilla",
    purpur     = "Purpur",
    paper      = "PaperMC",
    folia      = "Folia",
    velocity   = "Velocity",
    bungeecord = "BungeeCord",
    spigot     = "SpigotMC",
    forge      = "Forge",
    fabric     = "Fabric",
    mohist     = "MohistMC"
}

export default class JarDto
{
    @IsString()
    @IsNotEmpty()
    identifier: string;

    @IsEnum(JarType)
    type: JarType;

    @IsString()
    @Matches(/^\d(\.\d{1,2})?\.\d{1,2}$/, {
        groups: [ "version" ]
    })
    @IsNotEmpty()
    version: string;
}
