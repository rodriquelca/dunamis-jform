<template>
  <v-row>
    <v-col cols="12" sm="6" md="8">
      <v-text-field
        dense
        :label="data.name"
        persistent-placeholder
        class="caption"
        :value="displayValue"
        @input="input"
        @change="change"
      ></v-text-field>
    </v-col>
    <v-col cols="6" sm="6" md="4">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" x-small dark v-bind="attrs" v-on="on">
            f(x)
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" sm="6" md="6">
                <v-card>
                  <v-card-text>
                    <v-row align="center" class="mx-0">
                      <v-select
                        :items="scopes"
                        label="Formula"
                        outlined
                        @input="appendToDisplay"
                      ></v-select>
                    </v-row>
                    <v-row align="center" class="mx-0">
                      <v-btn fab color="primary" @click="appendToDisplay('C')">
                        C
                      </v-btn>

                      <v-btn fab color="primary" @click="appendToDisplay('(')">
                        (
                      </v-btn>
                      <v-btn fab color="primary" @click="appendToDisplay(')')">
                        )
                      </v-btn>
                      <v-btn fab color="primary" @click="appendToDisplay('+')">
                        +
                      </v-btn>
                    </v-row>
                    <v-row align="center" class="mx-0">
                      <v-btn
                        fab
                        color="secondary"
                        @click="appendToDisplay('1')"
                      >
                        1
                      </v-btn>
                      <v-btn
                        fab
                        color="secondary"
                        @click="appendToDisplay('2')"
                      >
                        2
                      </v-btn>
                      <v-btn
                        fab
                        color="secondary"
                        @click="appendToDisplay('3')"
                      >
                        3
                      </v-btn>
                      <v-btn fab color="primary" @click="appendToDisplay('-')">
                        -
                      </v-btn>
                    </v-row>
                    <v-row align="center" class="mx-0">
                      <v-btn
                        fab
                        color="secondary"
                        @click="appendToDisplay('4')"
                      >
                        4
                      </v-btn>
                      <v-btn
                        fab
                        color="secondary"
                        @click="appendToDisplay('5')"
                      >
                        5
                      </v-btn>
                      <v-btn
                        fab
                        color="secondary"
                        @click="appendToDisplay('6')"
                      >
                        6
                      </v-btn>
                      <v-btn fab color="primary" @click="appendToDisplay('*')">
                        *
                      </v-btn>
                    </v-row>
                    <v-row align="center" class="mx-0">
                      <v-btn
                        fab
                        color="secondary"
                        @click="appendToDisplay('7')"
                      >
                        7
                      </v-btn>
                      <v-btn
                        fab
                        color="secondary"
                        @click="appendToDisplay('8')"
                      >
                        8
                      </v-btn>
                      <v-btn
                        fab
                        color="secondary"
                        @click="appendToDisplay('9')"
                      >
                        9
                      </v-btn>
                      <v-btn fab color="primary" @click="appendToDisplay('/')">
                        /
                      </v-btn>
                    </v-row>
                    <v-row align="center" class="mx-0">
                      <v-btn
                        fab
                        color="secondary"
                        @click="appendToDisplay('+/-')"
                      >
                        +/-
                      </v-btn>
                      <v-btn
                        fab
                        color="secondary"
                        @click="appendToDisplay('0')"
                      >
                        0
                      </v-btn>
                      <v-btn
                        fab
                        color="secondary"
                        @click="appendToDisplay(',')"
                      >
                        ,
                      </v-btn>
                      <v-btn fab color="primary" @click="appendToDisplay('=')">
                        =
                      </v-btn>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-chip
                  v-for="(selection, i) in selections"
                  :key="i"
                  @click:close="selected.splice(i, 1)"
                >
                  <v-icon left v-text="selection.icon"></v-icon>
                  {{ selection }}
                </v-chip>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
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
        dialog: false,
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
        selections: [],
        isNumber: false,
      },
    };
  },
  computed: {
    scopes() {
      return this.$store.getters['app/getScopesEditor'];
    },
  },
  methods: {
    appendToDisplay(char) {
      if (char === 'C') {
        this.clearDisplay();
        return;
      }

      this.displayValue += char;

      if (this.isNumeric(char)) {
        if (this.isNumber) {
          this.selections[this.selections.length - 1] += char;
        } else {
          this.selections.push(char);
        }
        this.isNumber = true;
      } else {
        this.isNumber = false;
        this.selections.push(char);
      }
    },
    isNumeric(str) {
      if (typeof str != 'string') return false;
      return !isNaN(str) && !isNaN(parseFloat(str));
    },
    clearDisplay() {
      this.displayValue = ' ';
      this.selections = [];
    },
  },
});
export default CalculatedProp;
</script>
<style></style>
