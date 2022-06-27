<template>
  <v-checkbox
    small
    dense
    filled
    no-gutters
    class="caption"
    :value="value"
    @input="input"
    @change="change"
  >
    <template v-slot:label>
      <div class="caption">
        {{ data.name }}
      </div>
    </template>
  </v-checkbox>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const CheckboxProp = defineComponent({
  name: 'CheckboxProp',
  emits: ['input', 'change'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    return dynamicPropertyDefault(props, context);
  },
});
export default CheckboxProp;
</script>
<style>
</style>
