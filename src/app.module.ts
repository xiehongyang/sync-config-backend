import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
import { WorkModule } from './work/work.module';
import { LogisticModule } from './logistic/logistic.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URI'), // Loaded from .ENV
      })
    }),
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    WorkModule,
    LogisticModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
