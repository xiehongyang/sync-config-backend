import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from "@nestjs/common";
import { WorkService } from "src/work/work.service";
import { IndexCondition } from "src/model/work";


@Controller("works")
export class WorkController {

  constructor(
    private workService: WorkService
  ) {
  }

  @Get()
  async myList(@Req() req, @Query() query) {
    const userId = req.user._id;
    const { pageIndex, pageSize, title, isStar ,isDelete } = query;
    const findCondition = {
      user: userId,
      ...(title && { title: { $regex: title, $options: 'i' } }),
      ...(isStar && { isStar: isStar === 'true' }),
      ...(isDelete && { isDelete: isDelete === 'true' })
    }
    const listCondition: IndexCondition = {
      select: 'uuid title description isStar isDelete createdAt',
      find: findCondition,
      ...(pageIndex && { pageIndex: parseInt(pageIndex) }),
      ...(pageSize && { pageSize: parseInt(pageSize) })
    }
    return this.workService.getList(listCondition);
  }

  @Get(":id")
  async myWork(@Param("id") id: string) {
    return await this.workService.getWork(id);
  }

  @Post()
  async create(@Req() req) {
    const userId = req.user._id;
    const workData = await this.workService.createEmptyWork(userId);
    return workData.uuid;
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() payload) {
    return this.workService.updateWork(id, payload);
  }

  @Delete()
  async deleteWorks(@Body() payload) {
    return this.workService.deleteWorks(payload);
  }

  @Post('duplicate/:id')
  async duplicateWorks(@Param("id") id: string, @Req() req) {
    const userId = req.user._id;
    return this.workService.duplicateWork(id, userId);
  }


}
