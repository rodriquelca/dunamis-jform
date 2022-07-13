<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <v-hover v-slot="{ hover }">
      <v-autocomplete
        :value="control.data"
        :items="items"
        :loading="isLoading"
        hide-no-data
        :search-input.sync="search"
        item-text="label"
        item-value="value"
        :label="computedLabel"
        :placeholder="control.uischema.options.placeholder"
        prepend-icon="mdi-database-search"
        return-object
        :clearable="hover"
        @input="onChange"
      >
        <v-tooltip
          v-if="
            control.uischema.options.hint && control.uischema.options.hint != ''
          "
          slot="append-outer"
          top
        >
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
          </template>
          <span class="">{{ control.uischema.options.hint }}</span>
        </v-tooltip>
      </v-autocomplete>
    </v-hover>
  </control-wrapper>
</template>

<script lang="ts">
import {
  ControlElement,
  rankWith,
  JsonFormsRendererRegistryEntry,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from '../vue';
import {
  rendererProps,
  RendererProps,
  useJsonFormsControl,
} from '@jsonforms/vue2';

import { default as ControlWrapper } from '../controls/ControlWrapper.vue';
import { useVuetifyControl } from '../util';
import { VHover, VAutocomplete, VIcon, VTooltip } from 'vuetify/lib';

const controlRenderer = defineComponent({
  name: 'suggest-control-renderer-editor',
  props: {
    ...rendererProps<ControlElement>(),
  },
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),

  components: {
    ControlWrapper,
    VAutocomplete,
    VHover,
    VIcon,
    VTooltip,
  },
  setup(props: RendererProps<ControlElement>) {
    return useVuetifyControl(
      useJsonFormsControl(props),
      (value) => value || undefined
    );
  },
  computed: {},
  methods: {},
  watch: {
    search() {},
  },
});
export default controlRenderer;
export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(9, uiTypeIs('Suggest')),
};
</script>
