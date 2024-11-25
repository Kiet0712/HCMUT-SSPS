import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  getToken(context: ExecutionContext): string | null {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    return authHeader;
    if (authHeader && authHeader.split(" ")[0] === "Bearer") {
      const token = authHeader.split(" ")[1];
      request.token = token; // Store token in request object
      return token;
    }

    return null;
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride("isPublic", [context.getHandler(), context.getClass()]);
    const token = this.getToken(context);
    console.log(token);
    if (isPublic) return true;

    // console.log(context);

    return super.canActivate(context);
  }
}
