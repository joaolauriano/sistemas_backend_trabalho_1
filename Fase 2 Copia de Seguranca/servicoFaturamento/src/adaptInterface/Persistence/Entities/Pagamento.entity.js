import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('Pagamento')
export class Pagamento {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    codigo;

    @Column('bigint')
    codAss;

    @Column('float')
    valorPago;

    @Column('date')
    dataPagamento;
  }