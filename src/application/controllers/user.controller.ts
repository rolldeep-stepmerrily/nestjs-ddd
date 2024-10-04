import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from 'src/domain/services/user.service';
import { CreateUserDto } from '../dto/user.dto';
import { ParsePositiveIntPipe } from 'src/common/pipes';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  @ApiOperation({ summary: '회원 조회' })
  @Get('/:id')
  async findUserById(@Param('id', ParsePositiveIntPipe) userId: number) {
    return await this.userService.findUserById(userId);
  }
}
