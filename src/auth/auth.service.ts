import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../database/api/users/users.service';
import * as bcrypt from 'bcrypt';
import { BadRequest } from '../common/utils/responses/error.helper';

@Injectable()
export class AuthService {
  constructor(
    public usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = (await this.usersService.findByUsernane(username)) 
    const isMatch =  user.length
      ? await bcrypt.compare(pass, user[0]?.password)
      : false;
    
    if (user && isMatch) {
      const { password, ...result } = user[0];
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const accessToke =  await this.jwtService.signAsync(payload);
    const tokenInfon = await this.jwtService.verifyAsync(accessToke);    
    return {
      accessToke,
      exp: tokenInfon.exp,
      iat: tokenInfon.iat
    };
  }
  async decodeToken(token: string) {
   try { 
      return await this.jwtService.verifyAsync(token); 
   } catch (error) {
    throw BadRequest({message: 'token error'})
   }
  }
}
