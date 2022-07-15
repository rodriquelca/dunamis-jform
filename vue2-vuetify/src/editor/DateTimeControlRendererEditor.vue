<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    {{ control.data }}
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
          :type="inputFormat"
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
          v-bind="attrs"
          v-on="on"
          readonly
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        v-if="
          control.schema.format == 'date' ||
          control.schema.format == 'date-time'
        "
        @input="control.schema.format !== 'date-time' ? (menu = false) : true"
        @change="onDateChange"
        no-title
        scrollable
      >
        <v-btn text color="primary" @click="clearDate"> Clear </v-btn>
      </v-date-picker>
      <v-time-picker
        v-model="time"
        v-if="
          control.schema.format == 'time' ||
          control.schema.format == 'date-time'
        "
        @input="control.schema.format !== 'date-time' ? (menu = false) : true"
        @change="onTimeChange"
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
import { defineComponent, ref } from '../vue';
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from '@jsonforms/vue2';
import { default as ControlWrapper } from '../controls/ControlWrapper.vue';
import { useVuetifyControl } from '../util';
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
    let data = ref('');
    let inputValue = ref();
    return {
      ...useVuetifyControl(useJsonFormsControl(props)),
      menu: false,
      data,
      inputValue,
    };
  },
  computed: {
    date: {
      get(): string | null {
        // const dateFormat = this.appliedOptions.dateSaveFormat ?? 'YYYY-MM-DD';
        // const value = (this.control.data as string | undefined | null) || '';
        // const parsedDate = parseDateTime(value, dateFormat);
        // console.log('Parsed Date:', parsedDate);
        // return parsedDate ? parsedDate.local().format(dateFormat) : '';
        return this.control.data.split('T')[0];
      },
      set(newDate: string) {
        // const saveFormat =
        //   this.appliedOptions.dateTimeSaveFormat ?? 'YYYY-MM-DD';
        // const parsedDate = parseDateTime(newDate, saveFormat);
        // const result = parsedDate ? parsedDate.format(saveFormat) : newDate;
        // console.log('Date:', result);
        // if (this.inputFormat == 'date') {
        this.onChange(newDate);
        // }
      },
    },
    time: {
      get(): string | null {
        // const timeFormat = this.appliedOptions.timeSaveFormat ?? 'HH:mm';
        // const value = (this.control.data as string | undefined | null) || '';
        // const parsedTime = parseDateTime(value, timeFormat);
        // console.log('Parsed Time:', parsedTime);
        // return parsedTime ? parsedTime.local().format(timeFormat) : '';
        return this.control.data.split('T')[1].split('Z')[0];
      },
      set(newTime: string) {
        // const saveFormat = this.appliedOptions.dateTimeSaveFormat ?? 'HH:mm:ss';
        // const parsedTime = parseDateTime(newTime + ':00', saveFormat);
        // const result = parsedTime ? parsedTime.format(saveFormat) : newTime;
        // console.log('Time:', result);
        // if (this.inputFormat == 'time') {
        //   this.control.data = result;
        this.onChange(newTime + ':00');
        // }
      },
    },
    // dateTime(): string | null | undefined {
    //   const datetimeFormats = [
    //     'YYYY-MM-DDTHH:mm:ssZ',
    //     'YYYY-MM-DD',
    //     'HH:mm:ss',
    //   ];
    //   const value = (this.date ?? '') + (this.time ?? '');
    //   const dateTime = parseDateTime(value, datetimeFormats);
    //   const result = dateTime?.format(datetimeFormats[0]) ?? value;
    //   console.log(result);
    //   return result;
    // },
    inputFormat(): string | undefined {
      return this.control.schema.format === 'date-time'
        ? 'datetime-local'
        : this.control.schema.format;
    },
  },
  methods: {
    clearDate() {
      this.menu = false;
      this.date = null;
    },
    onDateChange(newDate: any) {
      if (this.inputFormat == 'datetime-local') {
        if (this.data == '') {
          this.data = newDate + 'T00:00:00Z';
          this.onChange(this.data);
        } else {
          let x = this.data.split('T');
          this.onChange(newDate + 'T' + x[1]);
        }
      }
    },
    onTimeChange(newTime: any) {
      if (this.inputFormat == 'datetime-local') {
        if (this.data == '') {
          this.data = '1999-01-01T' + newTime + ':00Z';
          this.onChange(this.data);
        } else {
          let x = this.data.split('T');
          this.onChange(x[0] + 'T' + newTime + ':00Z');
        }
      }
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, uiTypeIs('DateTime')),
};
</script>
