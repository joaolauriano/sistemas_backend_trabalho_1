import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GestaoController } from './gestao.controller.js';
import { Plano } from '../Persistence/Entities/Plano.entity.js';
import { Cliente } from '../Persistence/Entities/Cliente.entity.js';
import { Assinatura } from '../Persistence/Entities/Assinatura.entity.js';
import { Pagamento } from '../Persistence/Entities/Pagamento.entity.js';
import { ClienteRepositoryORM } from '../../adaptInterface/Persistence/Repositories/ClienteORM.repository.js'
import { AssinaturaRepositoryORM } from '../Persistence/Repositories/AssinaturaORM.repository.js';
import { PagamentoRepositoryORM } from '../Persistence/Repositories/PagamentoORM.repository.js';
import { PlanoRepositoryORM } from '../Persistence/Repositories/PlanoORM.repository.js';
import { ServicoGestao } from '../../aplication/services/ServicoGestao.js';
import { IPlanoModelRepository} from '../../domain/repositories/IPlanoModelRepository.js';
import { IClienteModelRepository } from '../../domain/repositories/IClienteModel.repository.js';
import { IAssinaturaModelRepository } from '../../domain/repositories/IAssinaturaModel.repository.js';
import { IPagamentoModelRepository } from '../../domain/repositories/IPagamentoModel.repository.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql10.freesqldatabase.com',
      port: 3306,
      username: 'sql10778961',
      password: 'yHtTaQVZhg',
      database: 'sql10778961',
      synchronize:true,
      autoLoadEntities: true,
    }),

    TypeOrmModule.forFeature([Plano,Cliente,Assinatura,Pagamento]),
  ],

  controllers: [GestaoController],
  providers: [
    {
      provide: IClienteModelRepository,
      useClass: ClienteRepositoryORM,
    },
    {
      provide: IAssinaturaModelRepository,
      useClass: AssinaturaRepositoryORM,
    },
    {
      provide: IPagamentoModelRepository,
      useClass: PagamentoRepositoryORM,
    },
    {
      provide: IPlanoModelRepository,
      useClass: PlanoRepositoryORM,
    },
    ServicoGestao,
  ],
})
export class AppModule {}