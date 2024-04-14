import { JarType } from "src/routes/jars/dto/jar.dto";
import PaperScraper from "./paper.scraper";

export default class VelocityScraper extends PaperScraper {
    public PROJECT_NAME = JarType.velocity;
}
