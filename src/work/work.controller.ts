import { Controller, Get, Post, Req } from "@nestjs/common";
import { WorkService } from "src/work/work.service";
import { IndexCondition } from "src/model/work";


@Controller("work")
export class WorkController {

  constructor(
    private workService: WorkService
  ) {
  }

  @Get()
  async myList(@Req() req) {
    const userId = req.user._id;
    return this.workService.getList(userId);
  }

  @Post()
  async createWork(@Req() req) {
    // const userId = req.user._id;
    // const workData = await this.workService.createEmptyWork(userId);
    // return workData.uuid;
  }


}
