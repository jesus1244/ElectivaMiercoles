/* eslint-disable prettier/prettier */
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthService } from '../service/auth.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')[1];
  
      if (!token) {
        throw new UnauthorizedException('Token not provided');
      }
  
      const decoded = await this.authService.validateToken(token);
  
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }
  
      // Almacena la información del usuario en el request para su uso posterior
      request.user = decoded;
  
      return true;
    }
  }