<template>
  <v-card elevation="0" color="transparent" class="no-gutters">
    <template v-for="(property, index) in properties">
      <component
        v-bind:is="property.type + '-prop'"
        :key="index"
        :config="property"
        v-model="data[property.id]"
        @visible="visible"
        @change="getData"
        @extendPanel="extendPanel"
        @backPanel="backPanel"
      ></component> </template
  ></v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import FieldProperties from '../models/FieldProperties';
import TextProp from './TextProp.vue';
import TextareaProp from './TextareaProp.vue';
import DropdownProp from './DropdownProp.vue';
import DateProp from './DateProp.vue';
import CheckboxProp from './CheckboxProp.vue';
import ItemsProp from './ItemsProp.vue';
import LabelProp from './LabelProp.vue';
import PanelExtended from '../PanelDynamicExtended/index';
import _ from 'lodash';

const PropertiesPanelDynamic = defineComponent({
  name: 'PropertiesPanelDynamic',
  components: {
    TextProp,
    TextareaProp,
    DropdownProp,
    CheckboxProp,
    DateProp,
    ItemsProp,
    LabelProp,
    ...PanelExtended,
  },
  props: ['config'],
  emit: ['backPanel'],
  setup(props: any, context: any) {
    let type = ref(props.config.type);
    let properties = ref(FieldProperties.get(type.value));
    let formatProperties = (properties: any, data: any) => {
      let res = {};
      properties.forEach((element) => {
        res[element.id] = null;
      });
      return _.assign(res, data);
    };
    let data = ref(
      formatProperties(FieldProperties.get(type.value), props.config.data)
    );

    /**
     * Add or remove the labelOrientation property for Image
     */
    // Clone props so as to avoid modyfing on the original props
    let sideProps = [...properties.value];
    // Get labelOrientation if exists
    let index = sideProps.indexOf(
      sideProps.find((obj) => obj.id === 'labelOrientation')
    );
    let labelOrientation = index > -1 ? sideProps[index] : {};
    // Check if imgLabel is set in order to determine if labelOrientation
    // should be rendered
    if (!data.value.imgLabel) {
      // Check to see if labelOrientation is trying to be rendered
      // If it is, delete it
      if (index > -1) {
        data.value.labelOrientation = '';
        labelOrientation = sideProps.splice(index, 1)[0];
      }
    } else {
      // Save labelOrientation if it is present
      labelOrientation = sideProps.find((obj) => obj.id === 'labelOrientation');
    }
    // Render the correct props
    properties.value = sideProps;

    return {
      properties,
      sideProps,
      type,
      data,
      labelOrientation,
      getData() {
        context.emit('updateData', _.cloneDeep(data.value));
      },
      extendPanel(dt: any) {
        context.emit('extendPanel', dt);
      },
      backPanel(dt: any) {
        context.emit('backPanel', dt);
      },
      visible(dt: any) {
        // TODO: Verify when implementation cases with visible increase
        if (dt) {
          switch (dt) {
            case 'date':
              properties.value = FieldProperties.get('DatePicker');
              break;
            case 'time':
              properties.value = FieldProperties.get('TimePicker');
              break;
            case 'date-time':
              properties.value = FieldProperties.get('DateTime');
              break;
            default:
              break;
          }
        }
      },
    };
  },
  beforeUpdate() {
    // Get labelOrientation
    let objToRemove = this.sideProps.find(
      (obj) => obj.id === 'labelOrientation'
    );
    let indexToRemove = this.sideProps.indexOf(objToRemove);

    // Check if imgLabel is set in order to determine
    // if labelOrientation should be rendered
    if (!this.data.imgLabel) {
      // No imgLabel, no labelOrientation
      if (indexToRemove > -1) {
        this.data['labelOrientation'] = {};
        this.sideProps.splice(indexToRemove, 1);
      }
    } else {
      // Get saved labelOrientation if there is no prop saved
      // and push into props
      if (indexToRemove === -1) {
        this.sideProps.push(this.labelOrientation);
      }
    }
  },
});
export default PropertiesPanelDynamic;
</script>
<style></style>
