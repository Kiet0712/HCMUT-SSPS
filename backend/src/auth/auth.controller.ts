import { Body, Controller, Get, Post } from "@nestjs/common";
import { IsEmail, IsString } from "class-validator";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { Public } from "src/common/decorators/public.decorator";

//the app is simple no need to seperate the dtos
export class LoginDto {
  @ApiProperty({ example: "user@example.com", description: "The email of the user" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "password123", description: "The user password" })
  @IsString()
  password: string;
}

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  //Login is a GET, because function is only getting token

  @Public()
  @ApiOperation({ summary: "Login" })
  @Post("login")
  async login(@Body() { email, password }: LoginDto) {
    const { access_token } = await this.authService.signToken(email);

    return { message: "Get token success", access_token };
  }

  @ApiOperation({ summary: "Say Hello" })
  @Get("hello")
  async hello() {
    return { message: "Hello world" };
  }
}
