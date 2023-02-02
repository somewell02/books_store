<template>
  <bordered-input
    type="text"
    :value="modelValue"
    @input="updateInput"
    v-mask="'+7 (###) ###-##-##'"
  />
</template>

<script>
import BorderedInput from "./BorderedInput";
import { mask } from "vue-the-mask";

export default {
  name: "phone-input",
  props: {
    modelValue: {
      type: String,
      required: true,
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
