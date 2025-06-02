import { NestFactory } from '@nestjs/core';
import { AppModule } from './adaptInterface/Controllers/app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Aplicação rodando na porta 3000');
}
bootstrap();