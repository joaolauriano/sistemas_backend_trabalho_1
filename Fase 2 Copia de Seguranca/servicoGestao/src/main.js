import { NestFactory } from '@nestjs/core';
import { AppModule } from './adaptInterface/Controllers/app.module.js';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://ptvzfiwp:0CSbKRGgJnu1v_mo1TJ19zGokx0MyKY4@jaragua.lmq.cloudamqp.com/ptvzfiwp'],
      queue: 'PagamentoPlanoServicoGestao',
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3001);

  // const microservice = app.getMicroservices()[0];

  // microservice.listen(() => {
  //   microservice.addHandler('PagamentoPlanoServicoGestao', async (payload) => {
  //     return servicoGestao.lidarComPagamentoRecebido(payload);
  //   });
  // });

  console.log('ServicoGestao rodando na porta 3001 e escutando eventos na fila PagamentoPlanoServicoGestao');
}
bootstrap();