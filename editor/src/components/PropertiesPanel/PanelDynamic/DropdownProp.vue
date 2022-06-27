<template>
  <v-combobox
    :items="data.items"
    :label="data.name"
    outlined
    persistent-placeholder
    class="caption"
    dense
    :value="value"
    @input="input"
    @change="change"
  ></v-combobox>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const DropdownProp = defineComponent({
  name: 'DropdownProp',
  emits: ['input', 'change'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    return dynamicPropertyDefault(props, context);
  },
});
export default DropdownProp;
</script>
<style>
</style>
