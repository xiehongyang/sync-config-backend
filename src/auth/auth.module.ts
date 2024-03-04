import { Module } from "@nestjs/common";
import { GoogleStrategy } from "src/auth/google.strategy";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "src/auth/auth.guard";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET_KEY")
      }),
      inject: [ConfigService],
      global: true
    })
  ],
  controllers: [],
  providers: [
    GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AuthModule {
}
