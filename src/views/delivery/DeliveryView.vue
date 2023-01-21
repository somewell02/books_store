<template>
  <base-layout>
    <div class="main-content">
      <h3>Доставка заказа</h3>
    </div>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import { subscribeBooks } from "@/data/firebase/booksApi";

export default {
  data() {
    return {
      booksList: null,
    };
  },

  components: {
    BaseLayout,
  },

  async created() {
    await this.initData();
  },

  methods: {
    async initData() {
      await subscribeBooks().then((data) => {
        this.booksList = data;
      });
    },
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
