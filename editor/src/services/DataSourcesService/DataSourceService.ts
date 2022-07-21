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
    this.lists = store.getters['dataSources/getSimpleLists'];
    this.apis = store.getters['dataSources/getApis'];
    if (data && data.id && data.type == 'api') {
      return this.apis.find((el: any) => el.id === data.id);
    }
    return this.formatDataSources();
  }
  call(config: any): any {
    if (config.type === 'list') {
      return new Promise((resolve, reject) => {
        const res = this.lists.find((el: any) => {
          return el.id === config.id;
        });
        resolve(
          res.data.length
            ? res.data.map((element: any) => {
                return {
                  [config.config['id']]: element.id,
                  [config.config['value']]: element.value,
                };
              })
            : []
        );
      });
    }
    if (config.type === 'api') {
      return this.apiCall(config);
    }
    return [];
  }
  apiCall(config: any) {
    const api = this.apis.find((el: any) => {
      return el.id === config.id;
    });
    return fetch(api.data.url, {
      method: api.data.method,
      body: JSON.stringify(api.data.body),
      headers: api.data.headers,
    })
      .then((res) => res.json())
      .then((res) => {
        const formatRes = this.indexByDots(res, api.data.output);
        return formatRes.map((el: any) => ({
          value: this.indexByDots(el, config.config.value),
          label: this.indexByDots(el, config.config.label),
        }));
      });
  }
  formatDataSources() {
    const list = this.lists.map((element: any) => {
      return {
        id: element.id,
        text: element.name,
        type: element.type,
        render: this.render(element.type),
      };
    });

    const apis = this.apis.map((element: any) => {
      return {
        id: element.id,
        text: element.name,
        type: element.type,
        render: this.render(element.type),
      };
    });
    return list.concat(apis);
  }
  render(type: string) {
    switch (type) {
      case 'list':
        return () => {
          return import('./ConfigViews/ListConfig.vue');
        };
        break;
      case 'api':
        return () => {
          return import('./ConfigViews/ApiConfig.vue');
        };
        break;
    }
    return () => {
      return 'div';
    };
  }
  indexByDots(obj: any, is: any, value: any): any {
    if (typeof is == 'string' && is.length != 0) {
      return this.indexByDots(obj, is.split('.'), value);
    } else if (is.length == 1 && value !== undefined) {
      return (obj[is[0]] = value);
    } else if (is.length == 0) {
      return obj;
    } else {
      return this.indexByDots(obj[is[0]], is.slice(1), value);
    }
  }
}
