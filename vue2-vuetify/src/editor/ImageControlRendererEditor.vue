<template>
  <control-wrapper
    v-bind="controlWrapper"
    :styles="styles"
    :isFocused="isFocused"
    :appliedOptions="appliedOptions"
  >
    <v-tooltip v-if="hint && hint != ''" top>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on" color="primary" small> mdi-information </v-icon>
      </template>
      <span class="">{{ hint }}</span>
    </v-tooltip>
    <div :class="[labelPlacement, 'mx-auto', 'align-center']">
      <v-img
        :title="alt"
        :alt="alt"
        :max-height="appliedOptions.height || 150"
        :max-width="appliedOptions.width || 150"
        :src="appliedOptions.image"
      >
      </v-img>
      <div class="mx-auto">{{ imageLabel }}</div>
    </div>
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
import { DisabledIconFocus } from '../controls/directives';
import { VContainer, VImg, VIcon, VTooltip } from 'vuetify/lib';

const controlRenderer = defineComponent({
  name: 'image-control-renderer-editor',
  components: {
    ControlWrapper,
    VContainer,
    VImg,
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
    let place = ref('');
    return {
      ...useVuetifyControl(
        useJsonFormsControl(props),
        (value) => value || undefined
      ),
      place,
    };
  },
  computed: {
    hint(): string {
      return this.control.uischema.options?.hint ?? '';
    },
    alt(): string {
      // This property is required
      return this.control.uischema.options?.alt ?? 'Image';
    },
    imageLabel(): string {
      return this.control.uischema.options?.imgLabel ?? '';
    },
    labelPlacement(): string {
      if (this.imageLabel) {
        let classes = '';
        switch (this.control.uischema.options?.labelOrientation) {
          case 'top':
            classes += 'd-flex flex-column-reverse';
            break;
          case 'left':
            classes = 'd-flex flex-row-reverse';
            break;
          case 'right':
            classes = 'd-flex flex-row';
            break;
          case 'bottom':
            classes = 'd-flex flex-column';
            break;

          default:
            classes = 'd-flex flex-row-reverse';
            break;
        }
        return classes;
      }
      return '';
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  // tester: rankWith(2, and(isStringControl, optionIs('isHtmlViewer', true))),
  tester: rankWith(9, uiTypeIs('Image')),
};
</script>
<style>
.img-parent {
  display: flex;
}
</style>
