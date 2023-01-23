<template>
  <section class="promotions-wrap">
    <h3 class="section-title">Акции и предложения</h3>
    <div class="promotions-list">
      <div
        v-for="item in promotionsList"
        :key="item.id"
        class="promotion-list-item"
      >
        <img :src="item.image" :alt="`promotion-${item.id}`" />
      </div>
    </div>
  </section>
</template>

<script>
import { getPromotions } from "@/data/firebase/promotionsApi.js";

export default {
  name: "MainPromotionsSection",
  data() {
    return {
      promotionsList: null,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.promotionsList = await getPromotions(3);
    },
  },
};
</script>

<style lang="scss" scoped>
.promotions-list {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  .promotion-list-item {
    img {
      width: 100%;
    }
  }
}
</style>
