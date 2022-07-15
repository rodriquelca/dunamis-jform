<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <v-hover v-slot="{ hover }">
      <v-select
        v-disabled-icon-focus
        :id="control.id + '-input'"
        :class="styles.control.input"
        :disabled="!control.enabled"
        :autofocus="appliedOptions.focus"
        :placeholder="placeholder"
        :label="computedLabel"
        :hint="control.description"
        :persistent-hint="persistentHint()"
        :required="control.required"
        :error-messages="control.errors"
        :clearable="hover"
        :value="control.data"
        :items="items"
        item-text="label"
        item-value="value"
        @change="onChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
        <v-tooltip v-if="hint && hint != ''" slot="append-outer" top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
          </template>
          <span class="">{{ hint }}</span>
        </v-tooltip>
      </v-select>
    </v-hover>
  </control-wrapper>
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import { defineComponent } from '../vue';
import {
  rendererProps,
  useJsonFormsOneOfEnumControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from './../controls/ControlWrapper.vue';
import { useVuetifyControl } from '../util';
import { VSelect, VHover, VIcon, VTooltip } from 'vuetify/lib';
import { DisabledIconFocus } from './../controls/directives';

const controlRenderer = defineComponent({
  name: 'dropdown-control-renderer-editor',
  components: {
    ControlWrapper,
    VSelect,
    VHover,
    VIcon,
    VTooltip,
  },
  directives: {
    DisabledIconFocus,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useVuetifyControl(
      useJsonFormsOneOfEnumControl(props),
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
    items(): string[] {
      if (this.control.schema.enum) {
        return this.control.schema?.enum;
      } else if (this.control.uischema.options?.items) {
        return this.control.uischema.options?.items ?? [];
      } else {
        return [];
      }
    },
  },
});

export default controlRenderer;
export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, uiTypeIs('Dropdown')),
};
</script>
