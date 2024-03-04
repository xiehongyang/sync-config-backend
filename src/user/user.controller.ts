import { Controller, Get, Render, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { GoogleOauthGuard } from "src/auth/google-oauth.guard";
import { UserService } from "src/user/user.service";
import { Public } from "src/auth/auth.guard";

@Controller("user")
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get('test')
  async test(@Req() req) {
    console.log('req.user', req.user);
  }

  @Public()
  @Get("google")
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {
  }
  @Public()
  @Get("google/callback")
  @UseGuards(GoogleOauthGuard)
  @Render("callback")
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const token = await this.userService.loginByGoogle(req.user);
      console.log("token", token);
      return { token: token };
    } catch (e) {
      console.log("e", e);
      throw new UnauthorizedException();
    }
  }
}
