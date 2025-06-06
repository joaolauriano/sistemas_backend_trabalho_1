import { NestFactory } from '@nestjs/core';
import { AppModule } from './adaptInterface/Controllers/app.module.js';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://ptvzfiwp:0CSbKRGgJnu1v_mo1TJ19zGokx0MyKY4@jaragua.lmq.cloudamqp.com/ptvzfiwp'],
      queue: 'PagamentoPlanoServicoGestao',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);

  console.log('ServicoFaturamento rodando na porta 3000 e enviando eventos RabbitMQ');
}
bootstrap();