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
}