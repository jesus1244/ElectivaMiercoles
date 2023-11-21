import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('saludar')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('despedir')
  getDespedir(): string {
    return this.appService.despedir();
  }
  
  @Post('despedir')
  postDespedir(): string {
    return this.appService.despedirConPost();
  }

  
}
