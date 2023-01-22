<template>
  <base-layout>
    <div class="main-content">
      <h3>Книги</h3>
      <div class="books-catalog-wrap">
        <div class="books-catalog-list">
          <book-card
            v-for="book in booksList"
            :key="book.id"
            :item="book"
            class="books-catalog-list-item"
          />
        </div>
      </div>
    </div>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import { getBooks } from "@/data/firebase/booksApi";
import BookCard from "@/components/cards/BookCard.vue";

export default {
  data() {
    return {
      booksList: null,
    };
  },
  components: {
    BookCard,
    BaseLayout,
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.booksList = await getBooks();
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

  .books-catalog-wrap {
    margin-top: 40px;

    .books-catalog-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
    }
  }
}
</style>
