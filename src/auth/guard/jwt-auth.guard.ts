import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Inject } from '@nestjs/common';
import { BadRequest } from '../../common/utils/responses/error.helper';
import { AuthService } from '../auth.service';
import { CreateUserDto } from '../../database/api/users/dto/create-user.dto';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const headers = context.getArgs()[0].headers;
    let token: string;
    if (headers['authorization'] === undefined) {
      throw BadRequest({ message: 'Unauthorized', status: 401 });
    } else {
      token = headers['authorization'].split('Bearer ')[1];
    }
    const tokenInfo: CreateUserDto = await this.authService.decodeToken(token);
    const [user] = await this.authService.usersService.findByUsernane(tokenInfo.username);
    
    const apiKeyTokenMatch: boolean =
      user && user?.username === tokenInfo?.username ;
    const parentCanActivate: boolean = (await super.canActivate(
      context,
    )) as boolean;
    return parentCanActivate && apiKeyTokenMatch;
  }

  handleRequest<T>(err: unknown, user: T, info: Record<string, unknown>): T {
    if (err || !user) {
      throw err || new HttpException({ status: 400, ...info }, 400);
    }
    return user;
  }
}
