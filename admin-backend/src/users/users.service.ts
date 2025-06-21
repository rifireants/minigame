import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, userid: 'testuser1', username: '테스트유저1', email: 'test1@example.com', level: 1, point: 1000, bankName: 'KB국민', accountNumber: '0123456789', createdAt: new Date() },
    { id: 2, userid: 'testuser2', username: '테스트유저2', email: 'test2@example.com', level: 1, point: 2000, bankName: '신한', accountNumber: '1234567890', createdAt: new Date() },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  create(user: User) {
    this.users.push(user);
  }

  update(id: number, user: Partial<User>) {
    const index = this.users.findIndex(u => u.id === id);
    this.users[index] = { ...this.users[index], ...user };
  }

  remove(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }
}
