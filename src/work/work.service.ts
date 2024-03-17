import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Work, WorkDocument } from "src/schemas/work.schema";
// import { nanoid } from "nanoid";
import { IndexCondition } from "src/model/work";

@Injectable()
export class WorkService {
  constructor(@InjectModel(Work.name) private workModel: Model<Work>) {
  }

  async createEmptyWork(userId) {
    // const uuid = nanoid(6);
    // const newEmptyWork: Partial<WorkDocument> = {
    //   author: userId,
    //   uuid
    // }
    // return this.workModel.create(newEmptyWork);
  }

  async getList(userId) {
    return this.workModel
      .find({ author: userId })
      .lean();
  }


}
