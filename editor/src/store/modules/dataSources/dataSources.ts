import { RootState } from '@/store/types';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { make } from 'vuex-pathify';

export interface DataSourcesState {
  lists: any;
  collections: any;
  apis: any;
  databases: any;
}

const state: DataSourcesState = {
  lists: [
    {
      id: 'u1oiwe786123io',
      name: 'Alphabet',
      type: 'list',
      schema: [
        {
          id: 'id',
          type: 'string',
          name: 'Id',
        },
        {
          id: 'value',
          type: 'string',
          name: 'Value',
        },
      ],
      data: [
        {
          id: 'A',
          value: 'A',
        },
        {
          id: 'B',
          value: 'B',
        },
        {
          id: 'C',
          value: 'C',
        },
        {
          id: 'D',
          value: 'D',
        },
        {
          id: 'E',
          value: 'E',
        },
        {
          id: 'F',
          value: 'F',
        },
        {
          id: 'G',
          value: 'G',
        },
        {
          id: 'H',
          value: 'H',
        },
        {
          id: 'I',
          value: 'I',
        },
        {
          id: 'J',
          value: 'J',
        },
        {
          id: 'K',
          value: 'K',
        },
        {
          id: 'L',
          value: 'L',
        },
        {
          id: 'M',
          value: 'M',
        },
        {
          id: 'N',
          value: 'N',
        },
        {
          id: 'O',
          value: 'O',
        },
        {
          id: 'P',
          value: 'P',
        },
      ],
    },
    {
      id: '123uiqae90182',
      name: 'Gender',
      type: 'list',
      schema: [
        {
          id: 'id',
          type: 'string',
          name: 'Id',
        },
        {
          id: 'value',
          type: 'string',
          name: 'Value',
        },
      ],
      data: [
        {
          id: 'M',
          value: 'Male',
        },
        {
          id: 'F',
          value: 'Female',
        },
      ],
    },
    {
      id: '1y3y2378hns989',
      name: 'Programming Languages',
      type: 'list',
      schema: [
        {
          id: 'id',
          type: 'string',
          name: 'Id',
        },
        {
          id: 'value',
          type: 'string',
          name: 'Value',
        },
      ],
      data: [
        {
          id: 'java',
          value: 'Java',
        },
        {
          id: 'js',
          value: 'Javascript',
        },
        {
          id: 'php',
          value: 'PHP',
        },
        {
          id: 'pearl',
          value: 'Pearl',
        },
        {
          id: 'ruby',
          value: 'Ruby',
        },
        {
          id: 'python',
          value: 'Python',
        },
        {
          id: 'flutter',
          value: 'Flutter',
        },
        {
          id: 'c',
          value: 'C#',
        },
      ],
    },
  ],
  collections: {
    users: {
      type: 'collection',
      schema: [
        {
          id: 'id',
          type: 'string',
          name: 'Id 1',
        },
        {
          id: 'name',
          type: 'string',
          name: 'Name',
        },
        {
          id: 'countries',
          type: 'string',
          name: 'Countries',
        },
        {
          field: 'location',
          type: 'string',
          name: 'Location',
        },
      ],
      data: [
        {
          id: '1',
          name: 'henry',
          countries: 'bolivia',
          location: 'La paz',
        },
        {
          id: '2',
          name: 'henry',
          countries: 'bolivia',
          location: 'La paz',
        },
        {
          id: '3',
          name: 'henry',
          countries: 'bolivia',
          location: 'La paz',
        },
        {
          id: '4',
          name: 'henry',
          countries: 'bolivia',
          location: 'La paz',
        },
        {
          id: '5',
          name: 'henry',
          countries: 'bolivia',
          location: 'La paz',
        },
      ],
    },
    abc: {
      type: 'list',
      schema: [
        {
          id: 'id',
          type: 'string',
          name: 'ID',
        },
        {
          id: 'value',
          type: 'string',
          name: 'Value',
        },
      ],
      data: [
        {
          id: 'A',
          value: 'A',
        },
        {
          id: 'B',
          value: 'B',
        },
        {
          id: 'C',
          value: 'C',
        },
        {
          id: 'D',
          value: 'D',
        },
        {
          id: 'E',
          value: 'E',
        },
        {
          id: 'F',
          value: 'F',
        },
        {
          id: 'G',
          value: 'G',
        },
        {
          id: 'H',
          value: 'H',
        },
      ],
    },
  },
  apis: [
    {
      id: 'api-1',
      name: 'Processmaker',
      type: 'api',
      data: {
        url: 'https://pm3-n275-dev.processmaker.net/api/1.0/workflow/project/289650576625433cc195332066440091/process-variable/dropdownVar001/execute-query',
        method: 'POST',
        params: {},
        headers: {
          authorization: 'Bearer 02efd5dd7fc793ffafe643038fb9837f28df1521',
          'content-type': 'application/json',
        },
        body: {
          dyn_uid: '307644763625433f6d07470067177319',
          field_id: 'countries',
          del_index: '',
          app_uid: '',
          filter: 'b',
        },
        dataInputVariables: [],
        output: '',
      },
    },
  ],
  databases: {},
};

const dataSources: Module<DataSourcesState, RootState> = {
  namespaced: true,
  state,
  ...{
    mutations: {
      ...make.mutations(state),
      ...mutations,
    },
  },
  ...{
    actions: {
      ...make.actions(state),
      ...actions,
    },
  },
  ...{
    getters: {
      ...make.getters(state),
      ...getters,
    },
  },
};

export default dataSources;
