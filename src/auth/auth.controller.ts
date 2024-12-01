import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up-dto';
import { UsersService } from 'src/users/providers/users.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly userService:UsersService){}
    
    @Post('signup')
    public async signUp(@Body() signUpDto:SignUpDto){
        return await this.userService.saveUser(signUpDto)
    }

}
