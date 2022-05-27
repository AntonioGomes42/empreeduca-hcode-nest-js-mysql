import { Module } from '@nestjs/common';
import { DataBaseModules } from 'src/database/database.module';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
          secret: process.env.JWT_SECRET,
          signOptions: {
          expiresIn: `${process.env.JWT_EXPIRES_IN}s`,
          },
      }),
    }),DataBaseModules],
  providers: [StatesService],
  exports: [StatesService],
  controllers: [StatesController]
})
export class StatesModule {}
