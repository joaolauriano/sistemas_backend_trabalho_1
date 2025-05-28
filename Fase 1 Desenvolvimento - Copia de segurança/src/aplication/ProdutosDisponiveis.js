// import { validate } from 'bycontract';
// import { Injectable, Dependencies } from '@nestjs/common';
// import { ServicoEstoque } from '../domain/services/ServicoGestao';

// @Injectable()
// @Dependencies(ServicoEstoque)
// export class ProdutosDisponiveis_UC{
//     constructor(servicoEstoque) {
//         validate(servicoEstoque,ServicoEstoque);
//         this.servicoEstoque = servicoEstoque;
//       }
    
//     async run(){
//         // Obtem a lista dos ItemDeEstoqueModel disponiveis
//         const disponiveis = await this.servicoEstoque.produtosDisponiveis();
//         // Retorna pares {codigo do produto,quantidade disponivel}
//         return disponiveis.map(item => {return {codigo: item.produto.codigo, qtdadeDisponivel: item.qtdadeDisponivel}});
//     }
// }