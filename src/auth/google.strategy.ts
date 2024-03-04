import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth2";

export interface googleProfile {
  provider: string,
  providerId: string,
  email: string,
  name: string,
  picture: string

}

export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.SERVER_ROOT_URI + "/user/google/callback"
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { id, name, emails, photos } = profile;
    const user: googleProfile = {
      provider: "google",
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value
    };

    done(null, user);
  }


}
