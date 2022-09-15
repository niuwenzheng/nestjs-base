import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Render('index')
  getHello(): any {
    return { port: process.env.PORT, message: 'Hello world!', age: 22 };
    // return this.appService.getHello();
  }
}
