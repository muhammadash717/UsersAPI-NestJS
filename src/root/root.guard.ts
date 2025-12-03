import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RootGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    // const request = context.switchToHttp().getRequest();
    // validate request
    // const hasRootAccess = request.user.permissions.includes('root');
    // return hasRootAccess;

    return true
  }
}
