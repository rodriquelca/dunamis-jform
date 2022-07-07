<template>
  <v-text-field
    dense
    :label="data.name"
    persistent-placeholder
    class="caption"
    :value="value"
    :type="inputType"
    :min="min"
    @input="input"
    @change="change"
  ></v-text-field>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const TextProp = defineComponent({
  name: 'TextProp',
  emits: ['input', 'change'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    let inputType = ref(props.config.options.inputType || 'text');
    let min = ref(props.config.options.min || 1);
    return {
      ...dynamicPropertyDefault(props, context),
      inputType,
      min,
    };
  },
});
export default TextProp;
</script>
<style></style>
