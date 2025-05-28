import { Controller, Dependencies, Get, Post, Bind, Body, Param } from '@nestjs/common';
import { ServicoGestao } from '../../domain/services/ServicoGestao.js';

@Controller('gestao')
@Dependencies(ServicoGestao)
export class GestaoController {
  constructor(servicoGestao) {
    this.servicoGestao = servicoGestao;
  }

  @Get("clientes")
  async todosClientes(){
    return this.servicoGestao.todosClientes();
  }

  @Get("planos")
  async todosPlanos(){
    return this.servicoGestao.todosPlanos();
  }

  @Post("assinaturas")
  @Bind(Body())
  async criarAssinatura(body) {
    const { codCli, codPlano } = body;
    return this.servicoGestao.criarAssinatura(codCli, codPlano);
  }
}
