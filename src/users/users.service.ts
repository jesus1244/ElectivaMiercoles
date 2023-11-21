import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const hashedPassword = bcrypt.hash(password, 10); // 10 is the number of salt rounds

    const newUser = this.userRepo.create({
      password: hashedPassword,
      ...rest,
    });

    return this.userRepo.save(newUser);
  }

  findByUsername(username: string) {
    const user = this.userRepo.findOne({ where: { username: username } });

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    return user;
  }

  getAll() {
    return this.userRepo.find();
  }

  getById(id: number) {
    return this.userRepo.findBy({ id: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }

  delete(id: number) {
    return this.userRepo.delete(id);
  }
}
