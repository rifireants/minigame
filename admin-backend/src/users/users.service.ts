import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findAll(sortField = 'id', sortOrder: 'ASC' | 'DESC' = 'ASC'): Promise<User[]> {
    return this.usersRepository.find({
      order: {
        [sortField]: sortOrder,
      },
    });
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(user: User): Promise<void> {
    await this.usersRepository.save(user);
  }

  async update(id: number, partialUser: Partial<User>): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) return;

    Object.assign(user, partialUser);
    await this.usersRepository.save(user); // <-- @BeforeUpdate 작동
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
