import { Injectable, Dependencies } from '@nestjs/common';
import { IClienteModelRepository } from '../../domain/repositories/IClienteModel.repository.js';
import { IAssinaturaModelRepository } from '../../domain/repositories/IAssinaturaModel.repository.js';
import { IPagamentoModelRepository } from '../../domain/repositories/IPagamentoModel.repository.js';
import { IPlanoModelRepository } from '../../domain/repositories/IPlanoModelRepository.js';

@Injectable()
@Dependencies(IClienteModelRepository,IAssinaturaModelRepository,IPagamentoModelRepository,IPlanoModelRepository,'ServicoGestaoPagamentoEmitter')
export class ServicoFaturamento {
    constructor(clienteRepository, assinaturaRepository, pagamentoRepository, planoRepository, rabbitClient) {
        this.clienteRepository = clienteRepository;
        this.assinaturaRepository = assinaturaRepository;
        this.pagamentoRepository = pagamentoRepository;
        this.planoRepository = planoRepository;
        this.rabbitClient = rabbitClient;
    }

    async salvarPagamentoRecebido({ codAss, valorPago, dataPagamento }) {
        const pagamento = await this.pagamentoRepository.salvarPagamento(codAss, valorPago, dataPagamento);

        this.rabbitClient.emit('PagamentoPlanoServicoGestao', {
            codAss,
            valorPago,
            dia: new Date(dataPagamento).getUTCDate(),
            mes: new Date(dataPagamento).getUTCMonth() + 1,
            ano: new Date(dataPagamento).getUTCFullYear(),
        });

        return pagamento;
    }

    async registrarPagamento(dadosPagamento) {
        return await this.salvarPagamentoRecebido(dadosPagamento);
    }
}