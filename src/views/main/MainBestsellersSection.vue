<template>
  <section class="bestseller-books-wrap">
    <h3 class="section-title">Хиты продаж</h3>
    <div class="bestseller-books-list">
      <book-card :item="item" class="bestseller-books-list-item" />
      <book-card :item="item" class="bestseller-books-list-item" />
      <book-card :item="item" class="bestseller-books-list-item" />
    </div>
    <div class="all-books-btn-wrap">
      <bordered-button> Каталог всех книг </bordered-button>
    </div>
  </section>
</template>

<script>
import BookCard from "@/components/cards/BookCard.vue";
import BorderedButton from "@/components/buttons/BorderedButton.vue";

export default {
  name: "MainBestsellersSection",
  components: {
    BorderedButton,
    BookCard,
  },
  data() {
    return {
      item: {
        id: "2922466",
        title: "Вязание ХИТОМИ ШИДА, 250 узоров, 6 авторских моделей",
        rating: 4.8,
        price: 1808,
        gallery: [
          "https://firebasestorage.googleapis.com/v0/b/book-store-d36d0.appspot.com/o/books%2Fimages%2F2922466%2Fimg1.png?alt=media&token=e3b0da29-7842-486f-8f94-323582b11a3a",
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.bestseller-books-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.all-books-btn-wrap {
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
