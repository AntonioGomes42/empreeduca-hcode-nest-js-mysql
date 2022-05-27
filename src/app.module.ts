import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { PhonesModule } from './phones/phones.module';
import { ContactsModule } from './contacts/contacts.module';
import { AffiliatesModule } from './affiliates/affiliates.module';
import { StatesModule } from './states/states.module';
import { AdressesModule } from './adresses/adresses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ServicesModule, PhonesModule, ContactsModule, AffiliatesModule, StatesModule, AdressesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
