<template>
  <component
    v-bind:is="determinedRenderer"
    v-bind="renderer"
    :class="setCustomStyle"
  ></component>
</template>

<script lang="ts">
import { defineComponent } from '../../config';
import UnknownRenderer from './UnknownRenderer.vue';
import maxBy from 'lodash/maxBy';
import {
  rendererProps,
  useJsonFormsRenderer,
  RendererProps,
} from '../jsonFormsCompositions';
import { ControlElement } from '@jsonforms/core';
export default defineComponent({
  name: 'dispatch-renderer',
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useJsonFormsRenderer(props);
  },
  computed: {
    determinedRenderer(): any {
      const renderer = maxBy(this.renderer.renderers, (r: any) =>
        r.tester(this.renderer.uischema, this.renderer.schema)
      );
      if (
        renderer === undefined ||
        renderer.tester(this.renderer.uischema, this.renderer.schema) === -1
      ) {
        return UnknownRenderer;
      } else {
        return renderer.renderer;
      }
    },
    setCustomStyle(): any {
      if (
        this.renderer.uischema.type === 'HorizontalLayout' ||
        this.renderer.uischema.type === 'VerticalLayout'
      ) {
        return 'layoutItem';
      }
      return '';
    },
  },
});
</script>
<style scoped>
.layoutItem {
  max-height: 97%;
}
</style>
