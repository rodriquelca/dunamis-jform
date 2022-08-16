<template>
  <div>
    <div
      v-if="$props.labelOrientation() != 'inherit'"
      no-gutters
      :class="$props.labelOrientation() == 'vertical' ? 'col' : 'row'"
      style="flex-wrap: nowrap"
    >
      <div
        :class="`${
          $props.labelOrientation() == 'vertical'
            ? 'row'
            : 'col col-' + $props.labelCols()
        } align-self-center`"
      >
        {{ computedLabel }}
      </div>
      <div :class="$props.labelOrientation() == 'vertical' ? 'row' : 'col'">
        <slot />
      </div>
    </div>
    <slot v-else />
  </div>
</template>

<script>
// Custom Wrapper for styles,label,functionality: For example:: Text, TextArea
export default {
  props: ['labelOrientation', 'computedLabel', 'labelCols'],
};
</script>
