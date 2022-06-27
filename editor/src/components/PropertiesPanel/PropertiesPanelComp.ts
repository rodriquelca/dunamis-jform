import { ref } from '@vue/composition-api';

export const dynamicPropertyDefault = (props: any, context: any) => {
  let data = ref(props.config);
  let input = (v: string) => {
    context.emit('input', v);
  };
  let change = (value: string) => {
    context.emit('change', value);
  };
  return { data, input, change };
};
