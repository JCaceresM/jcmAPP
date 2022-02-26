import { ConfigService } from "@nestjs/config"
// import { TYPEORM_CONFIG } from "src/config/constants"
import fs = require('fs');
import { AppConfigService } from "./config.service";

/**
 * This script will generate the ormconfig.json based on your Global Config
 * @param config Config Service for accessing the ENV Variables 
 */
const generateTypeormConfigFile = (config: ConfigService, appConfigService: AppConfigService) => {
  const typeormConfig = config.get(appConfigService.get('TYPEORM_CONFIG'));  
  fs.writeFileSync('ormconfig.json',
    JSON.stringify(typeormConfig, null, 2)
 );
}

export default generateTypeormConfigFile
