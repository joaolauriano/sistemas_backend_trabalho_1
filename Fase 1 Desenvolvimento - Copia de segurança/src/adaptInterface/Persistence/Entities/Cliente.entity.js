import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('Cliente')
export class Cliente {
    @PrimaryColumn('bigint') //É usado PrimaryColumn porque o campo é chamado codigo, conforme solicitado no trabalho e seu tipo também é especificado, não havendo a possibilidade de ser auto-incrementado.
    codigo;
    @Column('text')
    nome;
    @Column('text')
    email;
    // @OneToMany(() => Assinatura, assinatura => assinatura.cliente)
    // assinaturas; Deixei comentado porque ainda não preciso fazer relacionamentos entre as entidades
}