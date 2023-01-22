<template>
  <base-layout>
    <div class="main-content">
      <h3>Обратная связь</h3>
    </div>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";

export default {
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
  }
}
</style>
