export class AppConfigService {
  private readonly configService: { [key: string]: string | undefined };
  constructor() {
    this.configService = {
      APP_NAME: process.env.APP_NAME,
      DB_CONNECTION: process.env.DB_CONNECTION,
      DB_PORT: process.env.DB_PORT,
      DB_USER: process.env.DB_USER,
      DB_NAME: process.env.DB_NAME,
      DB_PASS: process.env.DB_PASS,
    };
  }
  get(key: string) {
    return this.configService[key];
  }
}
