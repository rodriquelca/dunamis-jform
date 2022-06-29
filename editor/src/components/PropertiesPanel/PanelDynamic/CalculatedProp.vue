<template>
  <v-card>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <div class="text-center">
          {{ displayValue }}
          <!-- <v-chip v-for="size in sizes" :key="size" :value="size">
          {{ size }}
        </v-chip  > -->
        </div>
      </v-row>
      <v-row align="center" class="mx-0">
        <v-btn fab x-small color="primary"> C </v-btn>
        <v-btn fab x-small color="primary"> ANS </v-btn>
        <v-btn fab x-small color="primary"> DEL </v-btn>
        <v-btn fab x-small color="primary"> + </v-btn>
      </v-row>
      <v-row align="center" class="mx-0">
        <v-btn fab x-small color="secondary" @click="appendToDisplay('1')">
          1
        </v-btn>
        <v-btn fab x-small color="secondary" @click="appendToDisplay('2')">
          2
        </v-btn>
        <v-btn fab x-small color="secondary" @click="appendToDisplay('3')">
          3
        </v-btn>
        <v-btn fab x-small color="primary" @click="appendToDisplay('-')">
          -
        </v-btn>
      </v-row>
      <v-row align="center" class="mx-0">
        <v-btn fab x-small color="secondary"> 4 </v-btn>
        <v-btn fab x-small color="secondary"> 5 </v-btn>
        <v-btn fab x-small color="secondary"> 6 </v-btn>
        <v-btn fab x-small color="primary"> * </v-btn>
      </v-row>
      <v-row align="center" class="mx-0">
        <v-btn fab x-small color="secondary"> 7 </v-btn>
        <v-btn fab x-small color="secondary"> 8 </v-btn>
        <v-btn fab x-small color="secondary"> 9 </v-btn>
        <v-btn fab x-small color="primary"> / </v-btn>
      </v-row>
      <v-row align="center" class="mx-0">
        <v-btn fab x-small color="secondary"> +/- </v-btn>
        <v-btn fab x-small color="secondary"> 0 </v-btn>
        <v-btn fab x-small color="secondary"> , </v-btn>
        <v-btn fab x-small color="primary"> = </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { dynamicPropertyDefault } from '../PropertiesPanelComp';
const CalculatedProp = defineComponent({
  name: 'CalculatedProp',
  emits: ['input', 'change'],
  props: ['value', 'config'],
  setup(props: any, context: any) {
    return {
      ...dynamicPropertyDefault(props, context),
      ...{
        displayValue: '',
      },
    };
  },
  methods: {
    appendToDisplay(char) {
      // if (this.clearDisplayNext) {
      //   this.clearDisplay();
      // }

      // if (char == '.' && this.displayValue.includes('.')) {
      //   return;
      // }

      // if (this.displayValue == '0' && char != '.') {
      //   this.displayValue = char;
      // } else {
      this.displayValue += ' ' + char;
      // }
    },
  },
});
export default CalculatedProp;
</script>
<style></style>
