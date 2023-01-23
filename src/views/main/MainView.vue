<template>
  <base-layout>
    <div class="main-content">
      <main-first-screen />
      <main-new-books-section class="new-books-section" />
      <main-bestsellers-section class="bestsellers-section" />
      <main-promotions-section class="sales-section" />
    </div>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import MainFirstScreen from "@/views/main/MainFirstScreen.vue";
import MainNewBooksSection from "@/views/main/MainNewBooksSection.vue";
import MainBestsellersSection from "@/views/main/MainBestsellersSection.vue";
import MainPromotionsSection from "@/views/main/MainPromotionsSection.vue";

export default {
  data() {
    return {};
  },

  components: {
    MainPromotionsSection,
    MainBestsellersSection,
    MainNewBooksSection,
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
  .bestsellers-section {
    margin-top: 120px;
  }
  .sales-section {
    margin-top: 120px;
  }
}
</style>
