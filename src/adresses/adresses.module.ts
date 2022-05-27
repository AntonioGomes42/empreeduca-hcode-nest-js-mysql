import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DataBaseModules } from 'src/database/database.module';
import { AdressesController } from './adresses.controller';
import { AdressesService } from './adresses.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: `${process.env.JWT_EXPIRES_IN}s`,
        },
      }),
    }), DataBaseModules],
  controllers: [AdressesController],
  providers: [AdressesService],
  exports:[AdressesService]
})
export class AdressesModule {}
