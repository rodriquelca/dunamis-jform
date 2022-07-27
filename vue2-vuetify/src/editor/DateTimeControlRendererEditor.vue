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
          :id="control.id + '-input'"
          :class="styles.control.input"
          :disabled="!control.enabled"
          :autofocus="appliedOptions.focus"
          :placeholder="placeholder"
          :label="computedLabel"
          hint=""
          :persistent-hint="persistentHint()"
          :required="control.required"
          :error-messages="control.errors"
          :value="valueChangeFormat"
          @focus="isFocused = true"
          @blur="
            blurChangeFormat();
            isFocused = false;
          "
          append-icon="mdi-calendar"
          v-bind="attrs"
          v-on="on"
          readonly
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        v-if="inputFormat == 'date' || inputFormat == 'date-time'"
        @input="inputFormat !== 'date-time' ? (menu = false) : (menu = true)"
        no-title
        scrollable
      >
        <v-btn text color="primary"> Clear </v-btn>
      </v-date-picker>
      <v-time-picker
        v-model="time"
        v-if="inputFormat == 'time' || inputFormat == 'date-time'"
        @input="inputFormat !== 'date-time' ? (menu = false) : (menu = true)"
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
    let date = ref(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    );
    let dateFormatted = ref(
      formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10)
      )
    );
    let time = ref(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(11, 16)
    );
    let timeFormatted = ref(
      formatTime(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .slice(11, 16)
      )
    );
    let dateTime = ref(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16)
        .replace('T', ' ')
    );
    let dateTimeFormatted = ref(
      formatDateTime.apply(this, [
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16)
          .replace('T', ' '),
      ])
    );

    function formatDate(dt: any): string | null {
      // MM-DD-YYYY format
      if (!dt) return null;
      const [year, month, day] = dt.split('-');
      return `${month}/${day}/${year}`;
    }
    function parseDate(dt: any): string | null {
      // ISO format
      if (!dt) return null;
      const [month, day, year] = dt.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    // Time is saved the same way it is displayed
    function formatTime(dt: any): string | null {
      if (!dt) return null;
      const [hours, minutes] = dt.split(':');
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }
    // To be displayed to the user
    function formatDateTime(dt: string): string | null {
      let [d, t] = dt.split(' ');
      if (!dt) return null;
      return formatDate(d) + ' ' + formatTime(t);
    }
    // To be saved in ISO format
    function parseDateTime(d: any, t: any): string | null {
      if (!d || !t) return null;
      return parseDate(d) + 'T' + formatTime(t) + ':00Z';
    }
    function blurChangeFormat(this: any) {
      if (this.inputFormat == 'date') {
        this.date = parseDate(
          'value' in dateFormatted ? dateFormatted.value : dateFormatted
        );
      } else if (this.inputFormat == 'time') {
        this.time = formatTime(
          'value' in timeFormatted ? timeFormatted.value : timeFormatted
        );
      } else if (this.inputFormat == 'date-time') {
        this.dateTime = parseDateTime(
          'value' in dateFormatted ? dateFormatted.value : dateFormatted,
          'value' in timeFormatted ? timeFormatted.value : timeFormatted
        );
      }
    }

    return {
      ...useVuetifyControl(useJsonFormsControl(props)),
      menu: false,
      date,
      dateFormatted,
      time,
      timeFormatted,
      dateTime,
      dateTimeFormatted,
      formatDate,
      parseDate,
      formatTime,
      formatDateTime,
      parseDateTime,
      blurChangeFormat,
    };
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
      if (this.inputFormat == 'date-time') {
        this.dateTimeFormatted = this.formatDateTime(
          this.date + ' ' + this.time
        );
      }
    },
    time() {
      this.timeFormatted = this.formatTime(this.time);
      if (this.inputFormat == 'date-time') {
        this.dateTimeFormatted = this.formatDateTime(
          this.date + ' ' + this.time
        );
      }
    },
    dateTime() {
      this.dateTimeFormatted = this.formatDateTime(this.dateTime);
    },
  },
  computed: {
    hint(): string {
      return this.control.uischema.options?.hint ?? '';
    },
    placeholder(): string {
      return this.control.uischema.options?.placeholder ?? '';
    },
    inputFormat(): string | undefined {
      return this.control.schema?.format ?? '';
    },
    valueChangeFormat(): string | null {
      if (this.inputFormat == 'date') {
        return this.dateFormatted;
      } else if (this.inputFormat == 'time') {
        return this.timeFormatted;
      } else if (this.inputFormat == 'date-time') {
        return this.dateTimeFormatted;
      } else {
        return null;
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
