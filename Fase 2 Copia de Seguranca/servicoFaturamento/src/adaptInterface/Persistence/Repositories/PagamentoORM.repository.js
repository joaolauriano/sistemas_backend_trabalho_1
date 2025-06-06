import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pagamento } from '../Entities/Pagamento.entity.js';
import { PagamentoModel } from '../../../domain/entities/Pagamento.model.js';
import { IPagamentoModelRepository } from '../../../domain/repositories/IPagamentoModel.repository.js';

@Injectable()
@Dependencies(getRepositoryToken(Pagamento))
export class PagamentoRepositoryORM extends IPagamentoModelRepository{
  #PagamentoRep;

  constructor(Pagamento){
    super();
    this.#PagamentoRep = Pagamento;
  }

  async todos() { 
    const resp = await this.#PagamentoRep.find();
    return PagamentoRepositoryORM.createFromObject(resp);
  }

  static createFromObject({codigo,codAss,valorPago,dataPagamento}){
    return new PagamentoModel(codigo,codAss,valorPago,dataPagamento)
  }

  async salvarPagamento(codAss, valorPago, dataPagamento) {
    if (!codAss || !valorPago || !dataPagamento) {
      throw new Error('Campos obrigatórios não fornecidos para salvar pagamento');
    }

    if (!(dataPagamento instanceof Date)) {
      dataPagamento = new Date(dataPagamento);
    }

    const novoPagamento = this.#PagamentoRep.create({
      codAss,
      valorPago,
      dataPagamento,
    });

    return await this.#PagamentoRep.save(novoPagamento);
  }
}