<template>
  <div class="my-2">
    <v-btn
      class="vpm-action-editor-btn justify-end"
      color="primary"
      plain
      small
      @click="backPanel"
    >
      <v-icon class="me-1" small>mdi-arrow-left</v-icon>
      Back
    </v-btn>
    <div class="v-expansion-panel-header">
      <div>
        <span class="caption font-weight-bold">Items</span
        ><i
          aria-hidden="true"
          class="v-icon notranslate px-2 mdi mdi-card theme--light"
          style="font-size: 16px"
        ></i>
      </div>
    </div>

    <v-card elevation="0" color="transparent" class="mx-4">
      <v-combobox
        class="caption"
        v-model="select"
        :items="itemsd"
        label="Data Source"
        outlined
        dense
      ></v-combobox>
      <v-row dense>
        <list-options
          :options="items"
          ref="static"
          value="value"
          label="label"
          valueTitle="Value"
          labelTitle="Label"
          :hideFooter="false"
        />
      </v-row>
      <v-row> </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from '@vue/composition-api';
import ListOptions from '../../Generic/ListOptions.vue';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const DataSourcePropExt = defineComponent({
  name: 'DataSourcePropExt',
  components: {
    ListOptions,
  },
  emits: ['input', 'change', 'backPanel'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    let items = ref([]);
    const serviceProvider = inject<any>('serviceProvider');
    const dataSources = serviceProvider.get('dataSources');

    return {
      ...dynamicPropertyDefault(props, context),
      backPanel() {
        context.emit('backPanel', null);
      },
      items,
      select: ref('Vuetify'),
      itemsd: [
        {
          text: 'Programming',
          color: 'blue',
        },
        {
          text: 'Vuetify',
          color: 'red',
        },
      ],
    };
  },
});
export default DataSourcePropExt;
</script>
<style>
</style>
