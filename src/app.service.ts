import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHome(): string {
    return 'Welcome to the Uga-Lib';
  }

  postHome(): string {
    return 'Welcome to Uga-Lib, please login to continue';
  }
}
