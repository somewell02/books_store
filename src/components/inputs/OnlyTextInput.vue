<template>
  <bordered-input
    type="text"
    :value="modelValue ?? ''"
    @input="updateInput"
    @keypress="notNumber"
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
    notNumber(event) {
      event = event ? event : window.event;
      const charCode = event.which ? event.which : event.keyCode;
      if (!(charCode > 31 && (charCode < 48 || charCode > 57))) {
        event.preventDefault();
      } else return true;
    },
  },
};
</script>
