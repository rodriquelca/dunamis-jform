<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          type="date"
          :id="control.id + '-input'"
          :class="styles.control.input"
          :disabled="!control.enabled"
          :autofocus="appliedOptions.focus"
          :placeholder="control.uischema.options.placeholder"
          :label="computedLabel"
          :hint="control.description"
          :persistent-hint="persistentHint()"
          :required="control.required"
          :error-messages="control.errors"
          :value="control.data"
          @focus="isFocused = true"
          @blur="isFocused = false"
          append-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-if="
          control.schema.format == 'date' ||
          control.schema.format == 'date-time'
        "
        v-model="date"
        @change="onChange"
        @input="menu = false"
        :min="control.schema.minDate"
        :max="control.schema.maxDate"
        no-title
        scrollable
      >
        <v-btn text color="primary" @click="clearDate"> Clear </v-btn>
      </v-date-picker>
      <v-time-picker
        v-if="
          control.schema.format == 'time' ||
          control.schema.format == 'date-time'
        "
        format="ampm"
      ></v-time-picker>
    </v-menu>
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
import { default as ControlWrapper } from '../controls/ControlWrapper.vue';
import { parseDateTime, useVuetifyControl } from '../util';
import { VTextField, VMenu, VDatePicker, VTimePicker, VBtn } from 'vuetify/lib';

const controlRenderer = defineComponent({
  name: 'date-time-control-renderer-editor',
  components: {
    ControlWrapper,
    VTextField,
    VMenu,
    VDatePicker,
    VTimePicker,
    VBtn,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return {
      ...useVuetifyControl(useJsonFormsControl(props)),
      menu: false,
      date: null,
    };
  },
  computed: {
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
  methods: {
    clearDate() {
      this.menu = false;
      this.date = null;
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, uiTypeIs('DateTime')),
};
</script>
