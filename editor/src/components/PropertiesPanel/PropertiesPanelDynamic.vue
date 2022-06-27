<template>
  <v-expansion-panels
    v-model="panel"
    multiple
    no-gutters
    dense
    class="caption"
    :key="selectedElement.edit"
  >
    <v-expansion-panel>
      <v-expansion-panel-header>
        <div>
          <span class="caption font-weight-bold"> General</span>
          <v-icon small class="px-2">mdi-card</v-icon>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <PropertiesPanelDynamic
          v-if="generalData"
          :config="generalData"
          @updateData="updateData"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import PropertiesPanelDynamic from './PanelDynamic/PanelDynamic.vue';
import { sync } from 'vuex-pathify';
import { omit } from 'lodash';
import { defineComponent } from '../../util/vue';
import { getVariableName } from '../../model/uischema';
import { tryFindByUUID } from '../../util/schemasUtil';
import _ from 'lodash';
const PropertiesPanel = defineComponent({
  name: 'PropertiesPanel',
  props: {},
  components: {
    PropertiesPanelDynamic,
  },
  data() {
    return {
      panel: [0, 1, 2, 3, 4],
      generalData: null,
      type: null,
      uiElement: null,
    };
  },
  computed: {
    schema: sync('app/editor@schema'),
    uischema: sync('app/editor@uiSchema'),
    selectedElement: sync('app/editor@element'),
  },
  mounted() {
    this.setSelection(this.selectedElement.selected);
  },
  watch: {
    selectedElement(newSelection, oldSelection) {
      this.setSelection(newSelection.selected);
    },
  },
  methods: {
    setSelection: function (newSelection) {
      let fieldData = {};
      let linkedSchemaUUID, elementSchema;
      // UIELEMENT is the ui schema for specific scope
      this.uiElement = tryFindByUUID(this.uischema, newSelection);

      if (this.uiElement) {
        linkedSchemaUUID = this.uiElement.linkedSchemaElement;
        // ELEMENTSCHEMA is the schema for specific scope
        elementSchema =
          linkedSchemaUUID && this.schema
            ? tryFindByUUID(this.schema, linkedSchemaUUID)
            : undefined;
      }

      fieldData = omit(this.uiElement, [
        'uuid',
        'parent',
        'elements',
        'linkedSchemaElement',
        'options.detail',
        'scope',
        'type',
      ]);
      fieldData['variable'] = getVariableName(this.uiElement);
      if (elementSchema && elementSchema.schema) {
        // Get the required property
        fieldData['required'] =
          this.schema.schema.required &&
          this.schema.schema.required.includes(getVariableName(this.uiElement));
        // Get the description property
        fieldData['description'] = elementSchema.schema.description
          ? elementSchema.schema.description
          : '';
        // Get the maLength property
        fieldData['maxLength'] = elementSchema.schema.maxLength
          ? elementSchema.schema.maxLength
          : '';

        fieldData['readOnly'] = elementSchema.schema.readOnly
          ? elementSchema.schema.readOnly
          : false;
      }
      this.generalData = {
        type: this.uiElement.type,
        data: fieldData,
      };
    },
    updateData(data: any) {
      const elementSchema = this.findElementSchema();
      this.generalData['data'] = data;
      // variable
      if (data.variable) {
        this.$store.dispatch('app/updateSchemaVariable', {
          elementUUID: this.uiElement.uuid,
          newVariable: data.variable,
        });
        this.$store.dispatch('locales/updateProperty', {
          oldProperty: elementSchema ? elementSchema.key : '',
          newProperty: data.variable,
        });
      }
      // required
      if (data.required) {
        this.$store.dispatch('app/updateSchemaRequired', {
          elementUUID: this.uiElement.uuid,
          required: data.required,
        });
      }
      // readOnly
      if (data.readOnly) {
        this.$store.dispatch('app/updateSchemaReadOnly', {
          elementUUID: this.uiElement.uuid,
          readOnly: data.readOnly,
        });
      }
      //Properties for datePicker
      if (data.minDate) {
        this.$store.dispatch('app/updateSchemaMinDate', {
          elementUUID: this.uiElement.uuid,
          minDate: data.minDate,
        });
        this.generalData['minDate'] = data.minDate;
      }
      if (data.maxDate) {
        this.$store.dispatch('app/updateSchemaMaxDate', {
          elementUUID: this.uiElement.uuid,
          maxDate: data.maxDate,
        });
      }
      if (data.defaultDate) {
        this.$store.dispatch('app/updateSchemaDefaultDate', {
          elementUUID: this.uiElement.uuid,
          defaultDate: data.defaultDate,
        });
      }
      // label
      if (data.label) {
        this.$store.dispatch('app/updateUISchemaElement', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { label: data.label },
        });
      }
      // options
      if (data.options) {
        this.$store.dispatch('app/updateUISchemaElement', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { options: data.options },
        });
      }
      // description
      if (data.description) {
        this.$store.dispatch('app/updateSchemaElement', {
          elementUUID: this.uiElement.uuid,
          changedProperties: {
            description: data.description,
          },
        });
      }
      // maxLength
      if (data.maxLength) {
        this.$store.dispatch('app/updateSchemaElement', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { maxLength: data.maxLength },
        });
      }
    },
    findElementSchema() {
      const linkedSchemaUUID = this.uiElement.linkedSchemaElement;
      const elementSchema =
        linkedSchemaUUID && this.schema
          ? tryFindByUUID(this.schema, linkedSchemaUUID)
          : undefined;
      let ele;
      for (const [key, value] of this.schema.properties) {
        if (_.isEqual(value, elementSchema)) {
          ele = {
            key: key,
            value: value,
          };
        }
      }
      return ele;
    },
  },
});
export default PropertiesPanel;
</script>
