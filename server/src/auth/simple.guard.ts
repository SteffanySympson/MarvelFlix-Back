import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SimpleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Não foi possível identificar o Token!');
    }

    if (token !== 'MEU_TOKEN') {
      throw new UnauthorizedException('Token não autorizado!');
    }
    return true;
  }
}
