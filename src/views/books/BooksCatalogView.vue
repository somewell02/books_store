<template>
  <base-layout>
    <div class="main-content">
      <h3>Книги</h3>
      <div class="list-modifications">
        <div class="filters-wrap">
          <bordered-filters :filters="filters" />
        </div>
        <div class="search-wrap">
          <search-input v-model="search" />
        </div>
        <div class="sorts-wrap">
          <bordered-select
            v-model="sort"
            :options="sortInfo.options"
            prefix="Сортировать:"
            dropdownSide="left"
          />
        </div>
      </div>
      <div class="books-catalog-wrap">
        <div class="books-catalog-list">
          <book-card
            v-for="book in modifiedBooksList()"
            :key="book.id"
            :item="book"
            class="books-catalog-list-item"
            @alert="openAlert"
          />
        </div>
        <filled-pagination
          v-model="pagination.page"
          :length="pagination.length"
          class="books-catalog-pagination"
        />
      </div>
    </div>
    <message-alert ref="alert"></message-alert>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import { getBooks } from "@/data/firebase/booksApi";
import BookCard from "@/components/cards/BookCard.vue";
import FilledPagination from "@/components/paginations/FilledPagination.vue";
import MessageAlert from "@/components/popups/MessageAlert.vue";
import { filter, paginate, search, sort } from "@/services/methods/list";
import BorderedSelect from "@/components/dropdowns/BorderedSelect.vue";
import SearchInput from "@/components/inputs/SearchInput.vue";
import { filters, searchInfo, sortInfo } from "./booksConstants";
import BorderedFilters from "@/components/filters/BorderedFilters.vue";

export default {
  data() {
    return {
      booksList: null,
      search: "",
      sort: "default",
      filters: filters,
      pagination: {
        page: 1,
        limit: 12,
        length: 0,
      },
    };
  },
  components: {
    BorderedFilters,
    SearchInput,
    BorderedSelect,
    MessageAlert,
    FilledPagination,
    BookCard,
    BaseLayout,
  },
  async created() {
    await this.initData();
    this.initFilters();
  },
  computed: {
    sortInfo() {
      return sortInfo;
    },
    searchInfo() {
      return searchInfo;
    },
  },
  methods: {
    async initData() {
      const books = await getBooks();
      this.booksList = books;
      this.pagination.length = Math.ceil(books.length / this.pagination.limit);
    },
    initFilters() {
      const bookThemes = new Set();
      this.booksList.forEach((book) => bookThemes.add(book.theme));
      this.filters.find((filter) => filter.id === "theme").options = Array.from(
        bookThemes
      )
        .sort()
        .map((item) => ({ id: item, title: item }));

      const bookAuthors = new Set();
      this.booksList.forEach((book) => bookAuthors.add(book.author));
      this.filters.find((filter) => filter.id === "author").options =
        Array.from(bookAuthors)
          .sort()
          .map((item) => ({ id: item, title: item }));

      const bookBindings = new Set();
      this.booksList.forEach((book) => bookBindings.add(book.binding));
      this.filters.find((filter) => filter.id === "binding").options =
        Array.from(bookBindings)
          .sort()
          .map((item) => ({ id: item, title: item }));
    },
    modifiedBooksList() {
      if (!this.booksList?.length) return [];

      let books = JSON.parse(JSON.stringify(this.booksList));

      if (this.search) books = search(books, this.searchInfo, this.search);

      books = filter(books, this.filters);

      if (this.sort !== "default") books = sort(books, this.sort);

      this.pagination.length = Math.ceil(books.length / this.pagination.limit);
      books = paginate(books, this.pagination);

      return books;
    },
    openAlert(type, text) {
      this.$refs.alert.open(type, text);
    },
  },
  watch: {
    sort: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
    },
    filters: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
    },
    search: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
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

  .list-modifications {
    margin-top: 40px;
    @include flex-between;
  }

  .books-catalog-wrap {
    margin-top: 20px;

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
