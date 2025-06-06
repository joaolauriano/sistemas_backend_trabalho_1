import { Controller, Dependencies, Get, Post, Patch, Bind, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ServicoFaturamento } from '../../aplication/services/ServicoFaturamento.js';

@Controller('faturamento')
@Dependencies(ServicoFaturamento)
export class FaturamentoController {
  constructor(servicoFaturamento) {
    this.servicoFaturamento = servicoFaturamento;
  }
  
  @Post('registrarpagamento')
  @Bind(Body())
  async registrarPagamento(body) {
    try {
      const { codAss, valorPago, dataPagamento } = body;

      if (!codAss || !valorPago || !dataPagamento) {
        throw new HttpException(
          'Dados incompletos para registro do pagamento',
          HttpStatus.BAD_REQUEST
        );
      }

      const data = new Date(dataPagamento + 'T12:00:00');
      if (isNaN(data)) {
        throw new HttpException(
          'Data de pagamento inválida',
          HttpStatus.BAD_REQUEST
        );
      }

      const pagamentoSalvo = await this.servicoFaturamento.salvarPagamentoRecebido({
        codAss,
        valorPago,
        dataPagamento: data,
      });

      return { message: 'Pagamento registrado com sucesso', pagamento: pagamentoSalvo };
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao registrar pagamento',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}