<template>
  <v-card elevation="0" color="transparent" class="no-gutters">
    <template v-for="(property, index) in properties">
      <component
        v-bind:is="property.type + '-prop'"
        :key="index"
        :config="property"
        v-model="data[property.id]"
        @change="getData"
      ></component> </template
  ></v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import FieldProperties from '../models/FieldProperties';
import TextProp from './TextProp.vue';
import TextareaProp from './TextareaProp.vue';
import DropdownProp from './DropdownProp.vue';
import CheckboxProp from './CheckboxProp.vue';
import _ from 'lodash';

const PropertiesPanelDynamic = defineComponent({
  name: 'PropertiesPanelDynamic',
  components: { TextProp, TextareaProp, DropdownProp, CheckboxProp },
  props: ['config'],
  setup(props: any, context: any) {
    let type = ref(props.config.type);
    let properties = FieldProperties.get(type);
    let formatProperties = (properties: any, data: any) => {
      let res = {};
      properties.forEach((element) => {
        res[element.id] = null;
      });
      return _.assign(res, data);
    };
    let data = ref(
      formatProperties(FieldProperties.get(type), props.config.data)
    );
    let getData = () => {
      context.emit('updateData', _.cloneDeep(data.value));
    };
    return { properties, type, data, getData };
  },
});
export default PropertiesPanelDynamic;
</script>
<style>
</style>
