import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength} from 'class-validator'

export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    username:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsStrongPassword()
    @IsNotEmpty()
    password:string;
}