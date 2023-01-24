<template>
  <base-layout>
    <div class="main-content">
      <h3>Корзина</h3>
    </div>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";

export default {
  data() {
    return {};
  },
  components: {
    BaseLayout,
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  margin-top: 40px;

  h3 {
    text-align: center;
    margin-bottom: 40px;
  }
}
</style>
