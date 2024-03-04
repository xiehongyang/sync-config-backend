import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleOauthGuard extends AuthGuard("google") {
  constructor() {
    super({
      redirect_uri: process.env.SERVER_ROOT_URI + "/user/google/callback",
      client_id: process.env.GOOGLE_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    });
  }
}
