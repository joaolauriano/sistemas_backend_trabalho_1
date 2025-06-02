import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Plano')
export class Plano {
    @PrimaryColumn('bigint')
    codigo;
    @Column("text")
    nome;
    @Column("float")
    custoMensal;
    @Column("date")
    data;
    @Column("text")
    descricao;
}