/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  updateSchemaVariable,
  updateSchemaRequired,
  updateSchemaReadOnly,
  updateSchemaMinDate,
  updateSchemaMaxDate,
  updateSchemaDefaultDate,
  duplicateElement,
  removeUiSchemaElement,
  createScopedElementToLayout,
  createScopedElementToTable,
  addPropertyToSchema,
  createUnscopedUiSchema,
  createSchema,
  createUiSchema,
  updateUISchemaElement,
  updateUISchemaElementOption,
  updateSchemaElement,
  palleteElements,
} from './../../utils/schemas';

const actions = {
  setScopeRules: ({ commit }: any, data: any) => {
    commit('SET_SCOPE_RULES', data);
  },
  getPaletteElements: ({ commit }: any) => {
    const clone = palleteElements();
    commit('SET_PALLETE_ELEMENTS', clone);
  },
  addScopedElementToLayout: ({ commit, state }: any, payload: any) => {
    const clone = createScopedElementToLayout(state, payload);
    commit('SET_UI_SCHEMA', clone.uiSchema);
  },
  addPropertyToSchema: ({ commit, state }: any, payload: any) => {
    const clone = addPropertyToSchema(state, payload);
    commit('SET_SCHEMA', clone);
  },
  addUnscopedElementToLayout: ({ commit, state }: any, payload: any) => {
    const clone = createUnscopedUiSchema(state, payload);
    commit('SET_UI_SCHEMA', clone);
  },
  addScopedElementToTable: ({ commit, state }: any, payload: any) => {
    const clone = createScopedElementToTable(state, payload);
    commit('SET_UI_SCHEMA', clone.uiSchema);
  },
  setSchema: ({ commit, state }: any, payload: any) => {
    const clone = createSchema(state, payload);
    commit('SET_SCHEMA', clone.schema);
  },
  setUiSchema: ({ commit, state }: any, payload: any) => {
    const clone = createUiSchema(state, payload);
    commit('SET_UI_SCHEMA', clone.uiSchema);
  },
  updateUISchemaElement: ({ commit, state }: any, payload: any) => {
    const clone = updateUISchemaElement(state, payload);
    commit('SET_UI_SCHEMA', clone);
  },
  updateUISchemaElementOption: ({ commit, state }: any, payload: any) => {
    const clone = updateUISchemaElementOption(state, payload);
    commit('SET_UI_SCHEMA', clone);
  },
  updateSchemaElement: ({ commit, state }: any, payload: any) => {
    const clone = updateSchemaElement(state, payload);
    commit('SET_SCHEMA', clone.schema);
  },
  updateSchemaVariable: ({ commit, state }: any, payload: any) => {
    const clone = updateSchemaVariable(state, payload);
    commit('SET_SCHEMA', clone.schema);
    commit('SET_UI_SCHEMA', clone.uiSchema);
  },
  removeUiSchemaElement: ({ commit, state }: any, payload: any) => {
    const clone = removeUiSchemaElement(state, payload);
    commit('REMOVE_UISCHEMA_ELEMENT', clone.uiSchema);
  },
  duplicateElement: ({ commit, state }: any, payload: any) => {
    const clone = duplicateElement(state, payload);
    commit('SET_SCHEMA', clone.schema);
    commit('SET_UI_SCHEMA', clone.uiSchema);
  },
  updateSchemaRequired: ({ commit, state }: any, payload: any) => {
    const clone = updateSchemaRequired(state, payload);
    commit('SET_SCHEMA', clone.schema);
  },
  updateSchemaReadOnly: ({ commit, state }: any, payload: any) => {
    const clone = updateSchemaReadOnly(state, payload);
    commit('SET_SCHEMA', clone.schema);
  },
  updateSchemaMinDate: ({ commit, state }: any, payload: any) => {
    const clone = updateSchemaMinDate(state, payload);
    commit('SET_SCHEMA', clone.schema);
  },
  updateSchemaMaxDate: ({ commit, state }: any, payload: any) => {
    const clone = updateSchemaMaxDate(state, payload);
    commit('SET_SCHEMA', clone.schema);
  },
  updateSchemaDefaultDate: ({ commit, state }: any, payload: any) => {
    const clone = updateSchemaDefaultDate(state, payload);
    commit('SET_SCHEMA', clone.schema);
  },
};

export default actions;
