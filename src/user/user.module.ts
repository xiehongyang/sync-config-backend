import { Module } from "@nestjs/common";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Connection } from "mongoose";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: User.name,
      useFactory: async (connection: Connection) => {
        const schema = UserSchema;
        const AutoIncrement = require("mongoose-sequence")(connection);
        schema.plugin(AutoIncrement, { inc_field: "id", id: "users_id_counter" });
        return schema;
      },
      inject: [getConnectionToken()]
    }]),
    AuthModule
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {
}
