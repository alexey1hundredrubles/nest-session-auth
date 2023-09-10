import { Injectable } from '@nestjs/common';
import { Session } from './session.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { randomUUID } from 'node:crypto';

const SESSION_TTL = 1000 * 60 * 60 * 24 * 30; // 30 days

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  async findOne(sessionUUID: string) {
    return await this.sessionModel.findOne({ sessionUUID });
  }

  async create(userId: Types.ObjectId, userAgent: string) {
    const sessionUUID = randomUUID();
    await this.sessionModel.create({
      userId,
      sessionUUID,
      userAgent,
      expiredAt: Date.now() + SESSION_TTL,
      createdAt: Date.now(),
    });
    return sessionUUID;
  }
  async remove(sessionUUID: string) {
    await this.sessionModel.deleteOne({ sessionUUID });
  }

  async isSessionValid(sessionUUID: string) {
    const session = await this.sessionModel.findOne({ sessionUUID });
    if (!session || +session.expiredAt < Date.now()) {
      return false;
    }
    return true;
  }
}
