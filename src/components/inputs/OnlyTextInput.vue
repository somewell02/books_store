<template>
  <bordered-input
    type="text"
    :value="modelValue ?? ''"
    @input="updateInput"
    v-mask="Array(maxLength).fill('S').join('')"
  />
</template>

<script>
import BorderedInput from "./BorderedInput";
import { mask } from "vue-the-mask";

export default {
  name: "only-text-input",
  props: {
    modelValue: {
      type: String,
      default: "",
      required: true,
    },
    maxLength: {
      type: Number,
      required: false,
      default: 10000,
    },
  },
  directives: { mask },

  components: {
    BorderedInput,
  },

  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
