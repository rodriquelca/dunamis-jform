<template>
  <json-forms
    :renderers="renderers"
    :data="data"
    :uischema="useExportUiSchema() || {}"
    :schema="useExportSchema() || false"
    height="500"
  />
</template>

<script lang="ts">
import { JsonForms } from '@jsonforms/vue2';
import { defaultEditorRenderers } from '../../renderers';
import { useExportSchema } from '../../util';

export default {
  name: 'DynaformEditor',
  props: {},
  components: {
    JsonForms,
  },
  data() {
    return {
      selection: '' as string,
      renderers: [],
      data: {},
    };
  },
  mounted() {
    this.renderers = defaultEditorRenderers;
  },
  methods: {
    useExportSchema() {
      return useExportSchema(this.$store.get('app/editor@schema'));
    },
    useExportUiSchema() {
      return this.$store.get('app/editor@uiSchema');
    },
  },
};
</script>
