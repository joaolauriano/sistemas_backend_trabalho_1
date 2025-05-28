import { validate } from 'bycontract';
import { Injectable, Dependencies } from '@nestjs/common';
import { IClienteModelRepository } from '../repositories/IClienteModel.repository.js';
import { IAssinaturaModelRepository } from '../repositories/IAssinaturaModel.repository.js';
import { IPagamentoModelRepository } from '../repositories/IPagamentoModel.repository.js';
import { IPlanoModelRepository } from '../repositories/IPlanoModelRepository.js';

@Injectable()
@Dependencies(IClienteModelRepository,IAssinaturaModelRepository,IPagamentoModelRepository,IPlanoModelRepository)
export class ServicoGestao {
    constructor(clienteRepository, assinaturaRepository, produtoRepository, planoRepository) {
        this.clienteRepository = clienteRepository;
        this.assinaturaRepository = assinaturaRepository;
        this.produtoRepository = produtoRepository;
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
}