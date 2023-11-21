import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!n mi primera llamada a un metodo get';
  }
  despedir(): string{
    return 'Hasta pronto.. fue un gusto saludarlos'
  }
  
  despedirConPost(): string{
    return 'Hasta pronto.. esto es despedida con POST'
  }

}
