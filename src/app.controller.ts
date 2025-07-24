import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/home')
  getHome():string {
    return this.appService.getHome();
  }

  @Post('/welcome')
  postHome(): string {
    return this.appService.postHome();
  }
}
