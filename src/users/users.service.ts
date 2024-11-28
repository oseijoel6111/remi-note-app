import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { InjectRepository } from '@nestjs/typeorm'
import { User } from "./user.entity";
import { Repository } from "typeorm";


@Injectable()
export class UsersService {

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    public async saveUser(createUserDto: CreateUserDto) {
        const newUser = this.userRepository.create(createUserDto)
        return await this.userRepository.save(newUser);
    }

}