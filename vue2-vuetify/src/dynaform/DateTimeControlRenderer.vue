<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <CustomControlWrapper
      v-bind="{ labelOrientation, computedLabel, labelCols }"
    >
      <v-text-field
        type="datetime-local"
        :id="control.id + '-input'"
        :class="styles.control.input"
        :disabled="!control.enabled"
        :autofocus="appliedOptions.focus"
        :placeholder="placeholder"
        :persistent-placeholder="labelOrientation() == 'inherit'"
        :label="labelOrientation() == 'inherit' ? computedLabel : null"
        :hint="control.description"
        :persistent-hint="persistentHint()"
        :required="control.required"
        :error-messages="control.errors"
        :value="dataTime"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
        <v-tooltip v-if="hint && hint != ''" slot="append" top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
          </template>
          <span class="">{{ hint }}</span>
        </v-tooltip>
      </v-text-field>
    </CustomControlWrapper>
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
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from './../controls/ControlWrapper.vue';
import { useVuetifyControl, parseDateTime } from '../util';
import { VTextField, VIcon, VTooltip } from 'vuetify/lib';
import CustomControlWrapper from '../controls/CustomControlWrapper.vue';

const controlRenderer = defineComponent({
  name: 'datetime-control-renderer-editor',
  components: {
    ControlWrapper,
    VTextField,
    VIcon,
    VTooltip,
    CustomControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return {
      ...useVuetifyControl(useJsonFormsControl(props)),
    };
  },
  computed: {
    hint(): string {
      return this.control.uischema.options?.hint ?? '';
    },
    placeholder(): string {
      return this.control.uischema.options?.placeholder ?? '';
    },
    dataTime: {
      get(): string | null | undefined {
        const datetimeLocalFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';
        const saveFormat = this.appliedOptions.dateTimeSaveFormat ?? undefined;
        const value = this.control.data as string | undefined | null;

        const dateTime = parseDateTime(value, saveFormat);
        return dateTime ? dateTime.local().format(datetimeLocalFormat) : value;
      },
      set(value: string) {
        const datetimeLocalFormats = [
          'YYYY-MM-DDTHH:mm:ss.SSS',
          'YYYY-MM-DDTHH:mm:ss',
          'YYYY-MM-DDTHH:mm',
        ];
        const saveFormat =
          this.appliedOptions.dateTimeSaveFormat ?? 'YYYY-MM-DDTHH:mm:ssZ';

        const dateTime = parseDateTime(value, datetimeLocalFormats);
        const result = dateTime ? dateTime.format(saveFormat) : value;

        this.onChange(result);
      },
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, uiTypeIs('DateTime')),
};
</script>
