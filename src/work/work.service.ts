import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Work, WorkDocument } from "src/schemas/work.schema";
import { nanoid } from "nanoid";
import { IndexCondition } from "src/model/work";

const defaultIndexCondition: Required<IndexCondition> = {
  pageIndex: 0,
  pageSize: 10,
  select: "",
  customSort: { createdAt: -1 },
  find: {}
};

@Injectable()
export class WorkService {
  constructor(@InjectModel(Work.name) private workModel: Model<Work>) {
  }

  async createEmptyWork(userId) {
    const uuid = nanoid(6);
    const newEmptyWork: Partial<WorkDocument> = {
      author: userId,
      uuid
    };
    return this.workModel.create(newEmptyWork);
  }

  async getList(condition: IndexCondition) {
    const fcondition = { ...defaultIndexCondition, ...condition };
    const { pageIndex, pageSize, select, customSort, find } = fcondition;
    const skip = pageIndex * pageSize;
    const res = await this.workModel
      .find(find)
      .select(select)
      .skip(skip)
      .limit(pageSize)
      .sort(customSort)
      .lean();
    const count = await this.workModel.countDocuments(find);
    return { count, list: res, pageSize, pageIndex };
  }

  async updateWork(id, payload) {
    return this.workModel.findOneAndUpdate({ uuid: id }, payload, { new: true }).lean();
  }

  async deleteWorks(payload) {
    for (const delId of payload) {
      await this.workModel.findOneAndDelete({ uuid: delId });
    }
    return;
  }

  async getWork(id: string) {
    return this.workModel.findOne({ uuid: id }).lean();
  }

  async duplicateWork(id: string, userId: any) {
    const oldWork = await this.getWork(id);
    const uuid = nanoid(6);
    const newEmptyWork: Partial<WorkDocument> = {
      author: userId,
      uuid,
      title:  oldWork ? oldWork.title : '',
      description:  oldWork ? oldWork.description : '',
      content:  oldWork ? oldWork.content : []
    };
    return this.workModel.create(newEmptyWork);
  }


}
