import { Service } from '../ServicesProvider';
import store from '../../store';

export default {
  build(): Service {
    const lists = store.getters['dataSources/getSimpleLists'];
    const apis = store.getters['dataSources/getApis'];
    return new DataSourceService('dataSources', 'DataSources', lists, apis);
  },
};

export class DataSourceService implements Service {
  id!: string;
  name!: string;
  type = 'dataSource';
  lists: any;
  apis: any;
  constructor(id: string, name: string, lists: any, apis: any) {
    this.id = id;
    this.name = name;
    this.lists = lists;
    this.apis = apis;
  }
  get(data?: any): void {
    return this.formatDataSources();
  }
  call(config: any): any {
    return {};
  }
  formatDataSources() {
    return this.lists.map((element: any) => {
      return {
        id: element.id,
        text: element.name,
        type: element.type,
        render() {
          return 'div';
        },
      };
    });
  }
}
