import { Module } from "@nestjs/common";
import { LogisticController } from "./logistic.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [LogisticController]
})
export class LogisticModule {
}
