import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DataBaseModules } from 'src/database/database.module';
import { PhonesModule } from 'src/phones/phones.module';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: `${process.env.JWT_EXPIRES_IN}s`,
        },
      }),
    }), DataBaseModules, PhonesModule],
  controllers:[ContactsController],
  providers: [ContactsService],
  exports:[ContactsService]
})
export class ContactsModule {}
