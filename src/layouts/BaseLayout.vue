<template>
  <div class="base-layout-wrap">
    <base-header />
    <main class="main-wrap container">
      <slot />
    </main>
    <base-footer />
  </div>
</template>

<script>
import BaseHeader from "@/components/structure/BaseHeader.vue";
import BaseFooter from "@/components/structure/BaseFooter.vue";
export default {
  components: {
    BaseFooter,
    BaseHeader,
  },
};
</script>

<style lang="scss" scoped>
.base-layout-wrap {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .main-wrap {
    flex-grow: 3;
  }
}
</style>
