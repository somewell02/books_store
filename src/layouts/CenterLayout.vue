<template>
  <div class="center-layout">
    <slot />
  </div>
</template>

<script>
export default {
  name: "center-layout",
};
</script>

<style lang="scss" scoped>
.center-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>
