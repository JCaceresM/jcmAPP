import { BadRequest } from '../../common/utils/responses/error.helper';

export class AppConfigService {
  private readonly configService: { [key: string]: string | undefined };
  constructor() {
    this.configService = {
      APP_NAME: process.env.APP_NAME,
      EXP_SECRET_JWT: process.env.EXP_SECRET_JWT,
      SECRET_JWT: process.env.SECRET_JWT,
      TYPEORM_CONFIG: 'database.config',
      DEFAULT_USERNAME: process.env.DEFAULT_USERNAME,
      DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
      DEFAULT_NAME: process.env.DEFAULT_NAME,
      DEFAULT_LASTNAME: process.env.DEFAULT_LASTNAME,
      DEFAULT_EMAIL: process.env.DEFAULT_EMAIL,
    };
  }
  get(key: string) {
    const env = this.configService[key];
    if (env) {
      return env;
    } else {
      throw BadRequest({
        message: `eviroment varible ${key} no found or undefined`,
      });
    }
  }
}
