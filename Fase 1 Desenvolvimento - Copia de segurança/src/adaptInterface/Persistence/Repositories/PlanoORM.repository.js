import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Plano } from '../Entities/Plano.entity.js';
import { PlanoModel } from '../../../domain/entities/Plano.model.js';
import { IPlanoModelRepository } from '../../../domain/repositories/IPlanoModelRepository.js';

@Injectable()
@Dependencies(getRepositoryToken(Plano))
export class PlanoRepositoryORM extends IPlanoModelRepository{
  #planoRep;

  constructor(planoRep){
    super();
    this.#planoRep = planoRep;
  }

  async todos() { 
    const resp = await this.#planoRep.find();
    return resp.map(plano => PlanoRepositoryORM.createFromObject(plano));
  }

  static createFromObject({codigo,nome,custoMensal,data,descricao}){
    return new PlanoModel(codigo,nome,custoMensal,data,descricao);
  }
}