import { Body, Controller, Post } from '@nestjs/common';
import alreadyExists from 'src/exceptions-db/already-exists.exception';
import tooBig from 'src/exceptions-db/too-big.exception';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('register')
    async createUser(@Body() newUser: LoginDto) {
        try {
            const createdUser = await this.authService.createUser(newUser);
            if (createdUser.code) {
                alreadyExists(createdUser);
                tooBig(createdUser);
            }
            return createdUser;
        } catch (error) {
            throw error;
        }
    }

    @Post('login')
    async login(@Body() body: LoginDto) {
        try {
            const loggedUser = await this.authService.login(body);
            return loggedUser;
        } catch (error) {
            throw error;
        }  
    }
}
