import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
}