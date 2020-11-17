import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemeryDatabase implements InMemoryDbService {

  // tslint:disable-next-line: typedef
  createDb() {
    const categories = [
      { id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa'},
      { id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios'},
      { id: 3, name: 'Lazer', description: 'Cinema, parque, praia, etc'},
      { id: 4, name: 'Salário', description: 'Recebimentos de salário'},
      { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer'},
    ];

    return { categories};
  }
}