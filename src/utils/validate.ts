import JarDto from "src/routes/jars/dto/jar.dto";
import { validate } from "class-validator";

export const validateJarVersion = async (version: string): Promise<boolean> => {
    let jar = new JarDto();
    jar.version = version;

    let validationErrors = await validate(jar, {
        groups: [ "version" ]
    });

    return validationErrors.length == 0;
}
