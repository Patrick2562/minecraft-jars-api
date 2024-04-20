# Minecraft Jars API

This is a scraper application built in NestJS, that collects the most popular Minecraft server jar files and checks for updates from time to time.
Files are downloaded and, if necessary, built and then stored.
It provides an easy-to-use api that can be easily integrated into other systems.


## Supported projects
- [Purpur](https://purpurmc.org/)
- [Vanilla](https://www.minecraft.net/)
- [PaperMC](https://papermc.io/software/paper)
- [Folia](https://papermc.io/software/folia)
- [Velocity](https://papermc.io/software/velocity)
- [BungeeCord](https://www.spigotmc.org/wiki/bungeecord/)
- [SpigotMC](https://www.spigotmc.org/)
- [Forge](https://forums.minecraftforge.net/)
- [Fabric](https://fabricmc.net/)
- [MohistMC](https://mohistmc.com/)
- [Pufferfish](https://pufferfish.host/)


## How to use?
0) We assume that [Docker](https://www.docker.com/) is installed and you have basic knowledge
1) Clone the repository
2) Copy `.env.example` as `.env`
3) Open `.env` and set the values you need (optional)
4) Run `docker compose up -d`
5) Open `http://localhost/api/status/ping` to check if it works well


## API Documentation
You can find the documentation on Wiki page. [(click here)](https://github.com/Patrick2562/minecraft-jars-api/wiki/API-Documentation)


## TODO
- final tune the api / responses
- redis cache
- rate limiting
- more configuration options in .env
- api key auth
- statistics
- documentation
