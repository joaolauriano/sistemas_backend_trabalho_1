// import { validate } from 'bycontract';
// import { Injectable, Dependencies } from '@nestjs/common';
// import { ServicoEstoque } from '../domain/services/ServicoGestao';
// import { ServicoVendas } from '../domain/services/ServicoVendas';

// @Injectable()
// @Dependencies(ServicoEstoque, ServicoVendas)
// export class EfetivaOrcamento_UC {
//     constructor(servicoEstoque, servicoVendas) {
//         validate(servicoEstoque, ServicoEstoque);
//         this.servicoEstoque = servicoEstoque;
//         this.servicoVendas = servicoVendas;
//     }

//     async run(id) {
//         return this.servicoVendas.efetivaOrcamento(id);
//     }
// }