import { ref } from '@vue/composition-api';

export const dynamicPropertyDefault = (props: any, context: any) => {
  const data = ref(props.config);
  const input = (v: string) => {
    context.emit('input', v);
  };
  const change = (value: any) => {
    context.emit('change', value);
    context.emit('visible', value.id);
  };
  const twoBind = (value: any) => {
    context.emit('input', value);
    context.emit('change', value);
  };
  return { data, input, change, twoBind };
};
