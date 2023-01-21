<template>
  <button>
    <slot />
  </button>
</template>

<script>
export default {
  name: "bordered-button",
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
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  background: none;

  &:hover {
    background: var(--primary-color);
    color: var(--text-primary-color);
  }
}
</style>
