import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { AuthModule } from "src/auth/auth.module";
import { Work, WorkSchema } from "src/schemas/work.schema";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: Work.name,
      useFactory: async (connection: Connection) => {
        const schema = WorkSchema;
        const AutoIncrement = require("mongoose-sequence")(connection);
        schema.plugin(AutoIncrement, { inc_field: "id", id: "works_id_counter" });
        return schema;
      },
      inject: [getConnectionToken()]
    }]),
    AuthModule
  ],
  providers: [WorkService],
  controllers: [WorkController]
})
export class WorkModule {}
