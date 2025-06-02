export class AssinaturaModel {
    codigo;
    codPlano;
    codCli;
    inicioFidelidade;
    fimFidelidade;
    dataUltimoPagamento;
    custoFinal;
    descricao;
    status;
  
    constructor(codigo,codPlano,codCli,inicioFidelidade,fimFidelidade,dataUltimoPagamento,custoFinal,descricao,status) {
      this.codigo = codigo;
      this.codPlano = codPlano;
      this.codCli = codCli;
      this.inicioFidelidade = inicioFidelidade;
      this.fimFidelidade = fimFidelidade;
      this.dataUltimoPagamento = dataUltimoPagamento;
      this.custoFinal = custoFinal;
      this.descricao = descricao;
      this.status = status;
    }  
  }
  