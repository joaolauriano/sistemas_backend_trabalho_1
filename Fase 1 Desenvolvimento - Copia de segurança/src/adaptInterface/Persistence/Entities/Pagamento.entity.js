import { Entity, PrimaryColumn, Column } from 'typeorm';


@Entity('Pagamento')
export class Pagamento {
    @PrimaryColumn('bigint')
    codigo;
    @Column("bigint")
    codAss;
    @Column("float")
    valorPago;
    @Column("date")
    dataPagamento;
  }