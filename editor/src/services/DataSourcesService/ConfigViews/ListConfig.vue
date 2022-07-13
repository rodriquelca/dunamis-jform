<template>
  <v-card class="px-1" color="transparent" elevation="0">
    <div class="pb-4">
      <span class="caption font-weight-bold">Configuration</span>
    </div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="dataConfig.id"
          persistent-placeholder
          :label="titles.id"
          outlined
          dense
          class="caption"
        >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="dataConfig.value"
          persistent-placeholder
          dense
          outlined
          :label="titles.value"
          class="caption"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from '@vue/composition-api';
const ListConfig = defineComponent({
  name: 'ListConfig',
  components: {},
  props: ['data'],
  setup(props: any, context: any) {
    let titles = {
      id: 'ID',
      value: 'Value',
    };
    let dataConfig = ref(
      props.data && props.data.config
        ? props.data.config
        : {
            id: '',
            value: '',
          }
    );
    return {
      titles,
      dataConfig,
      getData() {
        return dataConfig.value;
      },
    };
  },
});
export default ListConfig;
</script>
<style>
.vpm-item-list > div > div > div > .v-label {
  font-size: 12px !important;
}
</style>
