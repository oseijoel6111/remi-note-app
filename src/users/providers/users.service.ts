import { ConflictException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { InjectRepository } from '@nestjs/typeorm'
import { User } from "../user.entity";
import { Repository } from "typeorm";
import { HashingProvider } from "./hashing.provider";


@Injectable()
export class UsersService {

    constructor(
        /*
        * Config service
        */
        private readonly configService: ConfigService,

        /* 
        * userRepository 
        */
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        /* 
         * HashProvider   
        */
        private readonly hashProvider: HashingProvider
    ) { }

    public async saveUser(createUserDto: CreateUserDto) {
        try {
            // check if user exist
            const userExist = await this.userRepository.findOne({ where: { email: createUserDto.email } })
            if (userExist)
                throw new ConflictException()

            // create a new user 
            const newUser = this.userRepository.create({
                ...createUserDto,
                password: await this.hashProvider.hashPassword(createUserDto.password)
            })
            return await this.userRepository.save(newUser);

        } catch (error) {
            return error;
        }
    }

}