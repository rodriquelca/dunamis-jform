<template>
  <v-checkbox
    small
    dense
    filled
    no-gutters
    class="caption"
    :value="value"
    :input-value="val"
    @change="twoBind"
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
    return {
      ...dynamicPropertyDefault(props, context),
    };
  },
  computed: {
    val() {
      return this.$props.value ?? false;
    },
  },
});
export default CheckboxProp;
</script>
<style></style>
