import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Assinatura } from '../Entities/Assinatura.entity.js';
import { AssinaturaModel } from '../../../domain/entities/Assinatura.model.js';
import { IAssinaturaModelRepository } from '../../../domain/repositories/IAssinaturaModel.repository.js';

@Injectable()
@Dependencies(getRepositoryToken(Assinatura))
export class AssinaturaRepositoryORM extends IAssinaturaModelRepository{
  #assinaturaRep;

  constructor(assinaturaRep){
    super();
    this.#assinaturaRep = assinaturaRep;
  }

  async cadastraAssinatura(codCli, codPlano) { 
    const inicioFidelidade = new Date(); // data atual
    
    const fimFidelidade = new Date(inicioFidelidade); 
    fimFidelidade.setDate(fimFidelidade.getDate() + 365);

    const dataUltimoPagamento = new Date();

    const novaAssinatura = this.#assinaturaRep.create({
      codCli,
      codPlano,
      inicioFidelidade,
      fimFidelidade,
      dataUltimoPagamento,
      custoFinal: 0,
      descricao: ''
    });

    const salva = await this.#assinaturaRep.save(novaAssinatura);

    return AssinaturaRepositoryORM.createFromObject(salva);

  }

  static createFromObject({codigo,codPlano,codCli,inicioFidelidade,fimFidelidade,dataUltimoPagamento,custoFinaldescricao}){
    return new AssinaturaModel(codigo,codPlano,codCli,inicioFidelidade,fimFidelidade,dataUltimoPagamento,custoFinaldescricao);
  }
}