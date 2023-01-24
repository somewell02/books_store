<template>
  <section class="new-books-wrap">
    <h3 class="section-title">Новинки</h3>
    <div class="new-books-list">
      <book-card
        v-for="item in newBooksList"
        :key="item.id"
        :item="item"
        class="new-books-list-item"
        @alert="(type, text) => $emit('alert', type, text)"
      />
    </div>
  </section>
</template>

<script>
import BookCard from "@/components/cards/BookCard.vue";
import { getBooksByTag } from "@/data/firebase/booksApi";

export default {
  name: "MainNewBooksSection",
  components: {
    BookCard,
  },
  data() {
    return {
      newBooksList: null,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const result = await getBooksByTag("new", 4);
      result.shift();
      this.newBooksList = result;
    },
  },
};
</script>

<style lang="scss" scoped>
.new-books-list {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}
</style>
