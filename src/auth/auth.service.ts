import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DataBaseService } from 'src/database/database.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private db: DataBaseService,
        private jwtService: JwtService
    ) { }
    
  async createUser({ email, password }: LoginDto) {      
      const salt = bcrypt.genSaltSync(10);
      try {
          const createdUser = await this.db.users.create({
              data: {
                  email,
                  password: bcrypt.hashSync(password, salt),
              }
          });
          return createdUser;
      } catch (error) {
          return error;
      }
    }

    async login({ email, password }: LoginDto) {
            const user = await this.getByEmail(email);
        
            if (!user) {
              throw new BadRequestException('Usuário ou senha inválido.');
            }
        
            const passwordIsCorrect = await bcrypt.compare(password, user.password);
        
            if (!passwordIsCorrect) {
              throw new BadRequestException('Usuário ou senha inválido.');
            }
        
            const accessToken = this.jwtService.sign({
              id: user.id,
              email: user.email
            });
        
            delete user.password;
        
            return {
              user,
              accessToken,
            };
    }
    
    async getByEmail(email: string) {
        const user = await this.db.users.findUnique({
          where: {
            email,
          }
        });
        return user;
      }
}
