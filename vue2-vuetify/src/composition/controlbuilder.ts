import { isArray, isString, indexOf, isFunction } from 'lodash';
import _ from 'lodash';
import Vue from 'vue';
/**
 * Build function itemsBuilder for custom js that returns a items
 * @param uiSchema
 * @returns
 */
export const itemsBuilder = (uiSchema: any) => {
  let nitemsBuilder;
  const scope = pathControlSchema(uiSchema.scope);
  try {
    if (
      uiSchema &&
      uiSchema.options &&
      uiSchema.options.items &&
      isString(uiSchema.options.items)
    ) {
      nitemsBuilder = new Function('_, payload', uiSchema.options.items);
    }
  } catch (e: any) {
    console.error('JFORM::: Error in js ' + scope + ':::' + e);
  }
  return nitemsBuilder;
};

/**
 * Build items from JSON object Local or DataSources
 * @param uiSchema
 * @returns
 */
export const items = (config: any) => {
  let localItems: any = [];
  let dataSource: any;
  //Local Items
  if (
    config.uischema &&
    config.uischema.options.items &&
    isArray(config.uischema.options.items.local)
  ) {
    localItems = config.uischema.options.items.local;
  }

  //DataSources Items
  if (
    config.uischema &&
    config.uischema.options.items &&
    config.uischema.options.items.dataSource
  ) {
    dataSource = config.uischema.options.items.dataSource;
    return config.dataSources
      .call(dataSource)
      .then((res: any) => localItems.concat(res));
  } else {
    return Promise.resolve(localItems);
  }
};

export const onChange = (uiSchema: any) => {
  let fnOnchange = new Function();
  if (
    uiSchema.options &&
    uiSchema.options.events &&
    uiSchema.options.events.onChange
  ) {
    fnOnchange = new Function(
      uiSchema.options.events.onChange.arguments,
      uiSchema.options.events.onChange.body
    );
  }
  return fnOnchange;
};

export const watchScope = (store: any, uiSchema: any, provider: any) => {
  const scope = pathControlSchema(uiSchema.scope);
  const fnOnchange = onChange(uiSchema);
  return store.watch(
    (_state: any, getters: any) => {
      return getters['preview/getDataModel'](scope);
    },
    (n: string, o: string) => {
      Vue.nextTick(() => {
        provider.JReactivex.emit(scope, n);
      });
      Vue.nextTick(() => {
        fnOnchange(provider.JForm, n, o);
      });
    }
  );
};
/**
 * The function execute the dependents fields when existe rules with dependencies, in other case executes
 * In Dropdown is necesary execute the automaticaly
 * Suggest execute the function on change input
 * @param uiSchema
 * @param provider
 * @param fn
 */
export const scopesHandler = (
  uiSchema: any,
  provider: any,
  fn: any,
  fnPayload: any
) => {
  const fireItemsBuilder = ['Dropdown', 'RadioGroup', 'CheckboxGroup'];
  const deps = dependencies(uiSchema);
  const scope = pathControlSchema(uiSchema.scope);
  const type = uiSchema.type;
  const builder = itemsBuilder(uiSchema);
  const functionJoinFork = (payload: any) => {
    try {
      let fnPromise: any;
      // Save payload from dependencies
      if (isFunction(fnPayload)) {
        fnPayload(payload);
      }
      //Not continue with the execution when is suggest control
      if (indexOf(fireItemsBuilder, type) === -1) {
        return;
      }
      //Execute the fn for verify the promise
      if (isFunction(builder)) {
        fnPromise = builder(_, payload);
      }

      if (
        Boolean(fnPromise && typeof fnPromise.then === 'function') &&
        indexOf(fireItemsBuilder, type) !== -1 &&
        isFunction(builder)
      ) {
        fnPromise.then((res: any) => {
          const newArray = res || [];
          Vue.nextTick(() => {
            if (isFunction(fn)) {
              fn(newArray);
            }
          });
        });
      } else if (
        indexOf(fireItemsBuilder, type) !== -1 &&
        isFunction(builder)
      ) {
        fn(fnPromise);
      }
    } catch (e: any) {
      console.error('JFORM::: Error in js ' + scope + ':::');
    }
  };

  if (deps.length !== 0) {
    provider.JReactivex.joinFork(deps, functionJoinFork, scope);
  } else {
    functionJoinFork({});
  }
};

export const dependencies = (uiSchema: any) => {
  return uiSchema.options && uiSchema.options.dependencies
    ? uiSchema.options.dependencies
    : [];
};

export const pathControlSchema = (input: string): string => {
  return input.split('/').pop() || '';
};
