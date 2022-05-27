import { Module } from '@nestjs/common';
import { DataBaseModules } from 'src/database/database.module';
import { PhonesService } from './phones.service';

@Module({
  imports:[DataBaseModules],
  providers: [PhonesService],
  exports: [PhonesService]
})
export class PhonesModule {}
