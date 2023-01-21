<template>
  <base-layout>
    <!-- <preloader-spinner ref="preloader" />-->
    <div class="main-content">
      <main-first-screen />
      <main-new-books class="new-books-section" />
    </div>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import MainFirstScreen from "@/views/main/MainFirstScreen.vue";
import MainNewBooks from "@/views/main/MainNewBooks.vue";

export default {
  data() {
    return {};
  },

  components: {
    MainNewBooks,
    MainFirstScreen,
    BaseLayout,
  },

  async created() {
    if (this.$refs.preloader) {
      this.$refs.preloader.hide();
    }
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  .new-books-section {
    margin-top: 60px;
  }
}
</style>
