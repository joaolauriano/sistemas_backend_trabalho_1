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

  async buscarPorTipo(tipo) {
    const hoje = new Date();

    if (tipo === 'TODOS') {
      const todas = await this.#assinaturaRep.find();
      return todas.map(a => AssinaturaRepositoryORM.createFromObject(a));
    }

    let assinaturas = [];

    if (tipo === 'ATIVOS') {
      assinaturas = await this.#assinaturaRep
        .createQueryBuilder('assinatura')
        .where('assinatura.fimFidelidade > :hoje', { hoje })
        .getMany();
    } else if (tipo === 'CANCELADOS') {
      assinaturas = await this.#assinaturaRep
        .createQueryBuilder('assinatura')
        .where('assinatura.fimFidelidade <= :hoje', { hoje })
        .getMany();
    }

    return assinaturas.map(a => AssinaturaRepositoryORM.createFromObject(a));
  }

  async buscarPorCliente(codcli) {
    const hoje = new Date();
    const assinaturas = await this.#assinaturaRep.find({ where: { codCli: codcli } });

    return assinaturas.map(a => {
      const status = new Date(a.fimFidelidade) > hoje ? 'ATIVO' : 'CANCELADO';
      return AssinaturaRepositoryORM.createFromObject({ ...a, status });
    });
  }

  static createFromObject({codigo,codPlano,codCli,inicioFidelidade,fimFidelidade,dataUltimoPagamento,custoFinal,descricao}){
    const hoje = new Date();
    const status = (new Date(fimFidelidade) > hoje) ? 'ATIVO' : 'CANCELADO';
    
    return new AssinaturaModel(codigo,codPlano,codCli,inicioFidelidade,fimFidelidade,dataUltimoPagamento,custoFinal,descricao,status);
  }
}