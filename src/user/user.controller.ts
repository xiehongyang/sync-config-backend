import { Controller, Get, Render, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { GoogleOauthGuard } from "src/auth/google-oauth.guard";
import { UserService } from "src/user/user.service";
import { Public } from "src/auth/auth.guard";
import { Response } from 'express';
@Controller("user")
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get('info')
  async info(@Req() req) {
    return this.userService.findByEmail(req.user.email);
  }

  @Public()
  @Get("google")
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {
  }
  @Public()
  @Get("google/callback")
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const token = await this.userService.loginByGoogle(req.user);
      return res.render('callback', { token: token, frontEndUrl: process.env.FRONT_END_URI });
    } catch (e) {
      console.log("e", e);
      throw new UnauthorizedException();
    }
  }
}
