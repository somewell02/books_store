<template>
  <base-layout>
    <div class="main-content">
      <h3>Книги</h3>
      <div class="books-catalog-wrap">
        <div class="books-catalog-list">
          <book-card
            v-for="book in modifiedBooksList"
            :key="book.id"
            :item="book"
            class="books-catalog-list-item"
          />
        </div>
        <filled-pagination
          v-model="pagination.page"
          :length="pagination.length"
          class="books-catalog-pagination"
        />
      </div>
    </div>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import { getBooks } from "@/data/firebase/booksApi";
import BookCard from "@/components/cards/BookCard.vue";
import FilledPagination from "@/components/paginations/FilledPagination.vue";

export default {
  data() {
    return {
      booksList: null,
      pagination: {
        page: 1,
        limit: 12,
        length: 0,
      },
    };
  },
  components: {
    FilledPagination,
    BookCard,
    BaseLayout,
  },
  created() {
    this.initData();
  },
  computed: {
    modifiedBooksList() {
      if (!this.booksList?.length) return [];

      let books = Object.assign(this.booksList);

      books = books.filter(
        (book, bookIndex) =>
          bookIndex >= (this.pagination.page - 1) * this.pagination.limit &&
          bookIndex < this.pagination.page * this.pagination.limit
      );

      return books;
    },
  },
  methods: {
    async initData() {
      const books = await getBooks();
      this.booksList = books;
      this.pagination.length = Math.ceil(books.length / this.pagination.limit);
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

    .books-catalog-pagination {
      margin-top: 40px;
      justify-content: flex-end;
    }
  }
}
</style>
