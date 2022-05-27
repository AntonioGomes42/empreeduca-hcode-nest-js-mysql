import { Injectable } from '@nestjs/common';
import homePage from './home-page';

@Injectable()
export class AppService {
  getHello(): string {
    return homePage();
  }
}