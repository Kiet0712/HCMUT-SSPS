import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "./common/guards";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PassportModule.register({ session: true })],
  controllers: [],
  providers: [
    // { provide: APP_GUARD, useClass: JwtGuard } lol authentication
  ],
})
export class AppModule {}
