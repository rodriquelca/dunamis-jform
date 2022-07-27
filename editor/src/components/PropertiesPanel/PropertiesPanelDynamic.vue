<template>
  <v-window v-model="step">
    <v-window-item :value="1">
      <v-expansion-panels
        v-model="panel"
        multiple
        no-gutters
        dense
        class="caption"
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
              :key="key"
              v-if="generalData"
              :config="generalData"
              @updateData="updateData"
              @extendPanel="extendPanel"
              @backPanel="backPanel"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-window-item>

    <v-window-item :value="2">
      <component
        :is="panelExtended"
        @backPanel="backPanel"
        :config="extendedConfig"
      />
    </v-window-item>
  </v-window>
</template>

<script lang="ts">
import PropertiesPanelDynamic from './PanelDynamic/PanelDynamic.vue';
import { sync } from 'vuex-pathify';
import { omit } from 'lodash';
import { defineComponent } from '../../util/vue';
import { getVariableName } from '../../model/uischema';
import { tryFindByUUID } from '../../util/schemasUtil';
import PanelExtended from './PanelDynamicExtended/index';
import _ from 'lodash';
const PropertiesPanel = defineComponent({
  name: 'PropertiesPanel',
  props: {},
  components: {
    PropertiesPanelDynamic,
    ...PanelExtended,
  },
  data() {
    return {
      key: 1,
      step: 1,
      panel: [0, 1, 2, 3, 4],
      generalData: null,
      type: null,
      uiElement: null,
      panelHistory: [],
      extendedConfig: {},
    };
  },
  computed: {
    schema: sync('app/editor@schema'),
    uischema: sync('app/editor@uiSchema'),
    selectedElement: sync('app/editor@element'),
    panelExtended() {
      if (this.panelHistory.length == 0) {
        return 'div';
      }
      this.extendedConfig =
        this.generalData['data'][
          this.panelHistory[this.panelHistory.length - 1]['id']
        ];

      return this.panelHistory[this.panelHistory.length - 1].component;
    },
  },
  mounted() {
    this.setSelection(this.selectedElement.selected);
  },
  watch: {
    selectedElement(newSelection, oldSelection) {
      this.setSelection(newSelection.selected);
      this.key++;
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
        // Get the Type property
        fieldData['type'] = this.uiElement.type ? this.uiElement.type : '';
        // Get the placeholder property
        fieldData['placeholder'] = this.uiElement.options
          ? this.uiElement.options.placeholder
          : null;
        // Get the hint property
        fieldData['hint'] = this.uiElement.options
          ? this.uiElement.options.hint
          : null;
        // Get the label property
        fieldData['label'] = this.uiElement.options
          ? this.uiElement.options.label
          : null;
        // Get the rows property
        fieldData['rows'] = this.uiElement.options
          ? this.uiElement.options.rows
          : null;
        // Get the alt text property
        fieldData['alt'] = this.uiElement.options
          ? this.uiElement.options.alt
          : null;
        // Get the description property
        fieldData['description'] = elementSchema.schema.description
          ? elementSchema.schema.description
          : '';
        // Get the required property
        fieldData['required'] =
          (this.schema.schema.required &&
            this.schema.schema.required.includes(
              getVariableName(this.uiElement)
            )) ??
          false;
        // Get the maxLength property
        fieldData['maxLength'] = elementSchema.schema.maxLength
          ? elementSchema.schema.maxLength
          : '';
        // Get the readOnly property
        fieldData['readOnly'] = elementSchema.schema.readOnly
          ? elementSchema.schema.readOnly
          : false;
        // Get the Type property
        fieldData['type'] = this.uiElement.type ? this.uiElement.type : '';
        // Get the items property
        fieldData['items'] = this.uiElement.options
          ? this.uiElement.options.items
          : null;
        // Get the orientation property
        fieldData['orientation'] = this.uiElement.options
          ? this.uiElement.options.orientation
          : 'horizontal';
        // Get the hint property
        fieldData['hint'] = this.uiElement.options
          ? this.uiElement.options.hint
          : null;
        // Get the format property for DateTime
        fieldData['format'] = this.uiElement.options.format
          ? this.uiElement.options.format
          : 'date-time';
      }
      this.generalData = {
        type: this.uiElement.type,
        data: fieldData,
      };
    },
    updateData(data: any) {
      const elementSchema = this.findElementSchema();

      // type
      if (data.type) {
        this.$store.dispatch('app/updateUISchemaElement', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { type: data.type },
        });
      }
      // variable
      if (data.variable && this.generalData.data['variable'] != data.variable) {
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
      if (typeof data.required !== 'undefined') {
        this.$store.dispatch('app/updateSchemaRequired', {
          elementUUID: this.uiElement.uuid,
          required: data.required ?? false,
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
      //mask -> to options
      if (data.mask) {
        this.$store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { label: data.label },
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
      // items
      if (data.items) {
        this.$store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: {
            items: data.items,
          },
        });
      }
      // orientation -> to options
      if (data.orientation) {
        this.$store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: {
            orientation: data.orientation.id ?? 'horizontal',
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
      // hint -> to options
      if (data.hint || data.hint == '') {
        this.$store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { hint: data.hint },
        });
      }
      // rows for TextArea -> to options
      if (data.rows) {
        this.$store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { rows: data.rows },
        });
      }
      // alt text for Image -> to options
      if (data.alt || data.alt == '') {
        this.$store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { alt: data.alt },
        });
      }
      // placeholder -> to options
      if (data.placeholder || data.placeholder == '') {
        this.$store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { placeholder: data.placeholder },
        });
      }
      // format for DateTime
      if (data.format) {
        this.$store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { format: data.format.format },
        });
      }
      // default value -> to options
      if (data.defaultValue || data.defaultValue == '') {
        this.$store.dispatch('app/updateUISchemaElementOption', {
          elementUUID: this.uiElement.uuid,
          changedProperties: { defaultValue: data.defaultValue },
        });
      }
      this.generalData['data'] = data;
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
    extendPanel(dt) {
      this.panelHistory.push(dt);
      this.step = this.step + 1;
    },
    backPanel(dt) {
      this.step = this.step - 1;
      this.panelHistory.pop();
      this.updateData(Object.assign({}, this.generalData['data'], dt));
    },
  },
});
export default PropertiesPanel;
</script>
