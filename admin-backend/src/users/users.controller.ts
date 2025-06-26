import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Res() res: Response, @Query('sort') sort?: string): Promise<void> {
    let sortField = 'id';
    let sortOrder: 'ASC' | 'DESC' = 'ASC';

    if (sort) {
      const [field, order] = JSON.parse(sort); // React-Admin은 sort=["name","DESC"] 형식으로 보냄
      sortField = field;
      sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    }

    const users = await this.usersService.findAll(sortField, sortOrder);
    res.setHeader('Content-Range', `users 0-${users.length - 1}/${users.length}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
    res.json(users.map(({ password, ...rest }) => rest));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const { password, ...rest } = user;
    return rest;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() user: User): Promise<void> {
    await this.usersService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() user: Partial<User>): Promise<void> {
    await this.usersService.update(+id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(+id);
  }
}
