<template>
  <section class="new-books-wrap">
    <h3 class="section-title">Новинки</h3>
    <div class="new-books-list">
      <book-card :item="item" class="new-books-list-item" />
      <book-card :item="item" class="new-books-list-item" />
      <book-card :item="item" class="new-books-list-item" />
    </div>
  </section>
</template>

<script>
import BookCard from "@/components/cards/BookCard.vue";

export default {
  name: "MainNewBooksSection",
  components: {
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
.new-books-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}
</style>
