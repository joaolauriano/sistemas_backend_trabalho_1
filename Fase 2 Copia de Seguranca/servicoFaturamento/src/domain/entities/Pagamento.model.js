export class PagamentoModel {
    codigo;
    codAss;
    valorPago;
    dataPagamento;

    constructor(codigo,codAss,valorPago,dataPagamento){
      this.codigo = codigo;
      this.codAss = codAss;
      this.valorPago = valorPago;
      this.dataPagamento = dataPagamento;
    }
  }