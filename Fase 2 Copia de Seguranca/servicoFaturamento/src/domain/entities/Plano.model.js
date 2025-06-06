export class PlanoModel {
    codigo;
    nome;
    custoMensal;
    data;
    descricao;
  
    constructor(codigo, nome, custoMensal, data, descricao) {
      this.codigo = codigo;
      this.nome = nome;
      this.custoMensal = custoMensal;
      this.data = data;
      this.descricao = descricao;
    }
  }