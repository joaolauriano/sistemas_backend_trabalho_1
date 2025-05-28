import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cliente } from '../Entities/Cliente.entity.js';
import { ClienteModel } from '../../../domain/entities/Cliente.model.js';
import { IClienteModelRepository } from '../../../domain/repositories/IClienteModel.repository.js';

@Injectable()
@Dependencies(getRepositoryToken(Cliente))
export class ClienteRepositoryORM extends IClienteModelRepository{
  #clienteRep;

  constructor(clienteRep){
    super();
    this.#clienteRep = clienteRep;
  }
    
  async consultaPorCodigo(codigo) { 
    const resp = await this.#clienteRep.findOneBy({codigo});
    return ClienteRepositoryORM.createFromObject(resp);
  }

  async todos() { 
    const resp = await this.#clienteRep.find();
    return resp.map(obj => ClienteRepositoryORM.createFromObject(obj));
  }

  static createFromObject({codigo,nome,email}){ //Listar sempre todos os itens do entity equivalente
    return new ClienteModel(codigo,nome,email)
  }
}