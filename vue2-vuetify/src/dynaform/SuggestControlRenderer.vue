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
        :items="controlBuilder.items"
        :loading="isLoading"
        hide-no-data
        :search-input.sync="search"
        item-text="label"
        item-value="value"
        :label="computedLabel"
        :placeholder="placeholder"
        prepend-icon="mdi-database-search"
        return-object
        :required="control.required"
        :clearable="hover"
        @input="onChange"
      >
        <v-tooltip v-if="hint && hint != ''" slot="append-outer" top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
          </template>
          <span class="">{{ hint }}</span>
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
import { useVuetifyControlExt } from '../composition';
import { VHover, VAutocomplete, VIcon, VTooltip } from 'vuetify/lib';
import _ from 'lodash';

const controlRenderer = defineComponent({
  name: 'suggest-control-renderer',
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
    return useVuetifyControlExt(
      props,
      useJsonFormsControl(props),
      (value) => value || undefined
    );
  },
  computed: {
    hint(): string {
      return this.control.uischema.options?.hint ?? '';
    },
    placeholder(): string {
      return this.control.uischema.options?.placeholder ?? '';
    },
  },
  methods: {},
  watch: {
    search() {
      if (this.isLoading) return;
    },
  },
});
export default controlRenderer;
export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(9, uiTypeIs('Suggest')),
};
</script>
