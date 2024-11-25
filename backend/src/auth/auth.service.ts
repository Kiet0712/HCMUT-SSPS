import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private jwtSevice: JwtService,
    private configService: ConfigService,
  ) {}

  async signToken(email: string) {
    const payload = {
      email,
    };

    return {
      access_token: await this.jwtSevice.signAsync(payload, {
        secret: this.configService.get<string>("jwt_secret"),
        expiresIn: "1h",
      }),
    };
  }
}
