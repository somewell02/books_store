<template>
  <section class="new-books-wrap">
    <h3 class="section-title">Новинки</h3>
    <div class="new-books-list">
      <book-card class="new-books-list-item" />
      <book-card class="new-books-list-item" />
      <book-card class="new-books-list-item" />
    </div>
  </section>
</template>

<script>
import BookCard from "@/components/cards/BookCard.vue";

export default {
  name: "MainNewBooks",
  components: {
    BookCard,
  },
};
</script>

<style lang="scss" scoped>
.new-books-list {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;

  .new-books-list-item {
    width: 30%;
  }
}
</style>
