import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './user.entity';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';

@Module({
    controllers: [UsersController],
    providers: [UsersService, {
        provide: HashingProvider,
        useClass: BcryptProvider
    }],
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UsersService]
})
export class UsersModule {}
