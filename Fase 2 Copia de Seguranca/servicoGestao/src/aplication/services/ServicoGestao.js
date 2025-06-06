import { Injectable, Dependencies } from '@nestjs/common';
import { IClienteModelRepository } from '../../domain/repositories/IClienteModel.repository.js';
import { IAssinaturaModelRepository } from '../../domain/repositories/IAssinaturaModel.repository.js';
import { IPagamentoModelRepository } from '../../domain/repositories/IPagamentoModel.repository.js';
import { IPlanoModelRepository } from '../../domain/repositories/IPlanoModelRepository.js';

@Injectable()
@Dependencies(IClienteModelRepository,IAssinaturaModelRepository,IPagamentoModelRepository,IPlanoModelRepository)
export class ServicoGestao {
    constructor(clienteRepository, assinaturaRepository, pagamentoRepository, planoRepository) {
        this.clienteRepository = clienteRepository;
        this.assinaturaRepository = assinaturaRepository;
        this.pagamentoRepository = pagamentoRepository;
        this.planoRepository = planoRepository;
    }

    async todosClientes(){
        return this.clienteRepository.todos();
    }

    async todosPlanos(){
        return this.planoRepository.todos();
    }

    async criarAssinatura(codCli, codPlano) {
        return this.assinaturaRepository.cadastraAssinatura(codCli, codPlano);
    }

    async atualizarCustoPlano(idPlano, custoMensal) {
        return this.planoRepository.atualizarCustoPlano(idPlano, custoMensal);
    }

    async listarAssinaturasPorTipo(tipo) {
        const tiposValidos = ['TODOS', 'ATIVOS', 'CANCELADOS'];
        if (!tiposValidos.includes(tipo)) {
            throw new Error(`Tipo inválido. Valores permitidos: ${tiposValidos.join(', ')}`);
        }

        return this.assinaturaRepository.buscarPorTipo(tipo);
    }

    async buscarAssinaturasPorCliente(codcli) {
        return this.assinaturaRepository.buscarPorCliente(codcli);
    }

    async buscarAssinaturasPorPlano(codPlano) {
        return this.assinaturaRepository.buscarPorPlano(codPlano);
    }

    // Fase 2 do Projeto

    async lidarComPagamentoRecebido(payload) {
        const { codAss, valorPago, dia, mes, ano } = payload;

        return { status: 'sucesso', mensagem: 'Pagamento processado no ServicoGestao' };
    }
}