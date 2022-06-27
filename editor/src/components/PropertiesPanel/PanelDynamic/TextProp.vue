<template>
  <v-text-field
    dense
    :label="data.name"
    persistent-placeholder
    class="caption"
    :value="value"
    @input="input"
    @change="change"
  ></v-text-field>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const TextProp = defineComponent({
  name: 'TextProp',
  emits: ['input', 'change'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    return dynamicPropertyDefault(props, context);
  },
});
export default TextProp;
</script>
<style>
</style>
