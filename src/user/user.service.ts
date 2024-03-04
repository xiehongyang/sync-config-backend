import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User, UserDocument } from "src/schemas/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { googleProfile } from "../auth/google.strategy";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class UserService {


  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {

  }

  async loginByGoogle(userProfile: googleProfile) {
    const { provider, providerId, email, name, picture } = userProfile;
    try {
      const existUser = await this.findByEmail(email);
      console.log("existUser", existUser);
      if (existUser) {
        const token = await this.jwtService.signAsync({
          sub: existUser._id,
          email: existUser.email,
        });
        return token;
      }

      const userCreateData: Partial<User> = {
        googleId: providerId,
        email: email,
        name: name,
        picture: picture
      };

      const newUser = await this.userModel.create(userCreateData);
      const token = await this.jwtService.signAsync({
        sub: newUser._id,
        email: newUser.email
      }, {
        expiresIn: '12h'
      });
      return token;
    } catch (e) {
      console.log('e', e);
      throw new UnauthorizedException();
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }
}
