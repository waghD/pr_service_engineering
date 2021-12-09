import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private readonly sudokuRepository: Repository<UserEntity>
  ) {
  }

  async createUser(username: string, passwordHash: string) {
    const newUser = new UserEntity();
    newUser.username = username;
    newUser.passwordHash = passwordHash;
    return this.sudokuRepository.save(newUser)
  }

  async findUserByName(username: string): Promise<UserEntity> {
    return this.sudokuRepository.findOneOrFail({
      where: {
        username: username
      }
    });
  }

  async findUserByID(id: number): Promise<UserEntity> {
    return this.sudokuRepository.findOneOrFail(id);
  }
}
