import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Assinatura')
export class Assinatura {
    @PrimaryColumn('bigint')
    codigo;
    @Column("bigint")
    codPlano;
    @Column("bigint")
    codCli;
    @Column("date")
    inicioFidelidade;
    @Column("date")
    fimFidelidade;
    @Column("date")
    dataUltimoPagamento;
    @Column("float")
    custoFinal;
    @Column("text")
    descricao;
  }