<template>
  <base-layout>
    <div class="main-content">
      <h3>Книги</h3>
      <div class="list-modifications">
        <div class="sorts-wrap">
          <bordered-select
            v-model="sort"
            :options="sortInfo.options"
            prefix="Сортировать:"
            dropdownSide="left"
          />
        </div>
        <div class="search-wrap">
          <search-input v-model="search" />
        </div>
      </div>
      <div class="books-catalog-wrap">
        <div class="books-catalog-list">
          <book-card
            v-for="book in modifiedBooksList"
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
import { paginate, search, sort } from "@/services/methods/list";
import BorderedSelect from "@/components/dropdowns/BorderedSelect.vue";
import SearchInput from "@/components/inputs/SearchInput.vue";
import { sortInfo, searchInfo } from "./booksConstants";

export default {
  data() {
    return {
      booksList: null,
      search: "",
      sort: "default",
      pagination: {
        page: 1,
        limit: 12,
        length: 0,
      },
    };
  },
  components: {
    SearchInput,
    BorderedSelect,
    MessageAlert,
    FilledPagination,
    BookCard,
    BaseLayout,
  },
  created() {
    this.initData();
  },
  computed: {
    sortInfo() {
      return sortInfo;
    },
    searchInfo() {
      return searchInfo;
    },
    modifiedBooksList() {
      if (!this.booksList?.length) return [];

      let books = JSON.parse(JSON.stringify(this.booksList));

      if (this.search) books = search(books, this.searchInfo, this.search);

      if (this.sort !== "default") books = sort(books, this.sort);

      books = paginate(books, this.pagination);

      return books;
    },
  },
  methods: {
    async initData() {
      const books = await getBooks();
      this.booksList = books;
      this.pagination.length = Math.ceil(books.length / this.pagination.limit);
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
