<template>
  <bordered-input
    type="text"
    :value="modelValue"
    @input="updateInput"
    v-mask="Array(maxLength).fill('#').join('')"
  />
</template>

<script>
import BorderedInput from "./BorderedInput";
import { mask } from "vue-the-mask";

export default {
  name: "number-input",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    maxLength: {
      type: Number,
      required: false,
      default: 1000,
    },
  },
  components: {
    BorderedInput,
  },
  directives: { mask },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
