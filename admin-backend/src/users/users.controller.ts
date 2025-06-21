import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @Get()
  // findAll(): User[] {
  //   return this.usersService.findAll();
  // }
  @Get()
  findAll(@Res() res: Response): void {
    const users = this.usersService.findAll();
    res.setHeader('Content-Range', `users 0-${users.length - 1}/${users.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(users);
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    const user = this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  @Post()
  create(@Body() user: User) {
    this.usersService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: Partial<User>) {
    this.usersService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.usersService.remove(+id);
  }
}
