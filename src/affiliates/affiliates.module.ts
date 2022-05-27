import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdressesModule } from 'src/adresses/adresses.module';
import { ContactsModule } from 'src/contacts/contacts.module';
import { DataBaseModules } from 'src/database/database.module';
import { PhonesModule } from 'src/phones/phones.module';
import { StatesModule } from 'src/states/states.module';
import { AffiliatesController } from './affiliates.controller';
import { AffiliatesService } from './affiliates.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: `${process.env.JWT_EXPIRES_IN}s`,
        },
      }),
    }), DataBaseModules, ContactsModule, AdressesModule, StatesModule, PhonesModule],
  controllers: [AffiliatesController],
  providers: [AffiliatesService]
})
export class AffiliatesModule {}
