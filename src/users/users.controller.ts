import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./providers/users.service";

@Controller("users")
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Post('signup')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.saveUser(createUserDto);
    }

    

}