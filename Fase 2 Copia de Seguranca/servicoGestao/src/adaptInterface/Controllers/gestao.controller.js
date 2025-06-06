import { Controller, Dependencies, Get, Post, Patch, Bind, Body, Param} from '@nestjs/common';
import { ServicoGestao } from '../../aplication/services/ServicoGestao.js';
import { EventPattern, Payload } from '@nestjs/microservices';

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

  @Patch('planos/:idPlano')
  @Bind(Param('idPlano'), Body())
  async atualizarCustoPlano(idPlano, body) {
    const { custoMensal } = body;
    return this.servicoGestao.atualizarCustoPlano(idPlano, custoMensal);
  }

  @Get('assinaturas/:tipo')
  @Bind(Param('tipo'))
  async listarAssinaturasPorTipo(tipo) {
    return this.servicoGestao.listarAssinaturasPorTipo(tipo);
  }

  @Get('assinaturascliente/:codcli')
  @Bind(Param('codcli'))
  async buscarAssinaturasPorCliente(codcli) {
    return this.servicoGestao.buscarAssinaturasPorCliente(codcli);
  }

  @Get('assinaturasplano/:codplano')
  @Bind(Param('codplano'))
  async buscarAssinaturasPorPlano(codplano) {
    return this.servicoGestao.buscarAssinaturasPorPlano(codplano);
  }

  // Fase 2 do Projeto

  @EventPattern('PagamentoPlanoServicoGestao')
  async handlePagamento(data) {
    console.log('Evento recebido no GestaoController:', data);
    return await this.servicoGestao.lidarComPagamentoRecebido(data);
  }
}