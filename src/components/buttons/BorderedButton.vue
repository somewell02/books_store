<template>
  <button :class="btnClass">
    <slot />
  </button>
</template>

<script>
export default {
  name: "bordered-button",
  props: {
    color: {
      type: String,
      default: "primary",
      required: false,
    },
  },
  computed: {
    btnClass() {
      const colors = ["primary", "gray"];
      if (this.color == null || !colors.includes(this.color)) return "primary";
      else return this.color;
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  padding: 10px 20px;
  height: 40px;
  font-size: 14px;
  margin: 0;
  border-radius: 5px;
  min-width: 120px;
  background: none;

  &.primary {
    color: var(--primary-color);
    border: 1px solid var(--primary-color);

    &:hover {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }
  }

  &.gray {
    color: var(--text-color);
    border: 1px solid var(--border-color);

    &:hover {
      background: var(--border-color);
    }
  }
}
</style>
