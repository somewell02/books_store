<template>
  <div
    class="app"
    :class="{
      'dark-theme': this.$store.state.darkTheme,
    }"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  name: "BaseHeader",
  created() {
    this.$store.dispatch("cart/getItemsByIds");
  },
};
</script>
