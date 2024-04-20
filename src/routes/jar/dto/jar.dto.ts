import { IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";

export enum JarType {
    purpur     = "purpur",
    vanilla    = "vanilla",
    paper      = "paper",
    folia      = "folia",
    velocity   = "velocity",
    bungeecord = "bungeecord",
    spigot     = "spigot",
    forge      = "forge",
    fabric     = "fabric",
    mohist     = "mohist",
    pufferfish = "pufferfish"
}

export enum JarName {
    purpur     = "Purpur",
    vanilla    = "Vanilla",
    paper      = "PaperMC",
    folia      = "Folia",
    velocity   = "Velocity",
    bungeecord = "BungeeCord",
    spigot     = "SpigotMC",
    forge      = "Forge",
    fabric     = "Fabric",
    mohist     = "MohistMC",
    pufferfish = "Pufferfish"
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

    @IsString()
    @IsNotEmpty()
    fileName: string;
}
