// import { validate } from 'bycontract';
// import { Injectable, Dependencies } from '@nestjs/common';
// import { ServicoVendas } from '../domain/services/ServicoVendas';

// @Injectable()
// @Dependencies(ServicoVendas)
// export class CriaOrcamento_UC{
//     constructor(servicoVendas) {
//         validate(servicoVendas,ServicoVendas);
//         this.servicoVendas = servicoVendas;
//       }
    
//     async run(itens){
//         let orcamento = await this.servicoVendas.criaOrcamento(itens);
//         return {id:orcamento.id,
//                 custo:orcamento.custo,
//                 imposto:orcamento.imposto,
//                 desconto:orcamento.desconto,
//                 valorPago:orcamento.valorPago
//                }
//     }
// }