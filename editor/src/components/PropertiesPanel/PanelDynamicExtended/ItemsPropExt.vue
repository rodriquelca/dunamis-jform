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

    <div class="pb-2 px-5">
      <span class="caption font-weight-bold">Items</span>
    </div>

    <v-card elevation="0" color="transparent" class="mx-4">
      <v-combobox
        class="caption"
        persistent-placeholder
        v-model="select"
        :items="sources"
        label="Data Source"
        outlined
        dense
      ></v-combobox>

      <component
        ref="configurationView"
        :data="dataConfigView"
        v-bind:is="configDataSourceView"
      ></component>

      <v-row dense>
        <list-options
          ref="refList"
          :options="items"
          :value="keys.value"
          :label="keys.label"
          :valueTitle="titles.value"
          :labelTitle="titles.label"
          :hideFooter="false"
        />
      </v-row>
      <v-row> </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  ref,
} from '@vue/composition-api';
import ListOptions from '../../Generic/ListOptions.vue';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const ItemPropExt = defineComponent({
  name: 'ItemPropExt',
  components: {
    ListOptions,
  },
  emits: ['input', 'change', 'backPanel'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    let items = ref(
      props.config && props.config.local ? props.config.local : []
    );
    const serviceProvider = inject<any>('serviceProvider');
    const dataSources = serviceProvider.get('dataSources');
    const configurationView = ref(null);
    const titles = ref({
      value: 'Value',
      label: 'Label',
    });
    const keys = ref({
      value: 'value',
      label: 'label',
    });
    const refList = ref(null);
    const sources = ref(dataSources.get());

    let select = ref(
      props.config && props.config.dataSource
        ? {
            id: props.config.dataSource.id,
            text: props.config.dataSource.name,
            type: props.config.dataSource.type,
          }
        : null
    );
    let dataConfigView = ref(
      props.config && props.config.dataSource ? props.config.dataSource : {}
    );

    let configDataSourceView = computed(() => {
      let src;
      if (select.value && select.value.render) {
        return select.value.render;
      } else if (props.config && props.config.dataSource) {
        src = sources.value.find((el) => el.id === props.config.dataSource.id);
        if (src) {
          return src.render;
        }
      }
      return 'div';
    });
    return {
      configurationView,
      refList,
      dataConfigView,
      ...dynamicPropertyDefault(props, context),
      backPanel() {
        let items = {
          dataSource: null,
          local: refList.value.getData(),
        };
        if (select.value) {
          items.dataSource = {
            id: select.value.id,
            name: select.value.text,
            type: select.value.type,
            config: configurationView.value.getData
              ? configurationView.value.getData()
              : {},
          };
        }
        context.emit('backPanel', { items });
      },
      items,
      select,
      titles,
      keys,
      configDataSourceView,
      sources,
    };
  },
});
export default ItemPropExt;
</script>
<style>
</style>
