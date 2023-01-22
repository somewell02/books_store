<template>
  <section class="bestseller-books-wrap">
    <h3 class="section-title">Хиты продаж</h3>
    <div class="bestseller-books-list">
      <book-card
        v-for="item in bestsellerBooksList"
        :key="item.id"
        :item="item"
        class="bestseller-books-list-item"
      />
    </div>
    <div class="all-books-btn-wrap">
      <router-link :to="{ name: 'books-catalog' }">
        <bordered-button> Каталог всех книг </bordered-button>
      </router-link>
    </div>
  </section>
</template>

<script>
import BookCard from "@/components/cards/BookCard.vue";
import BorderedButton from "@/components/buttons/BorderedButton.vue";
import { getBooksByTag } from "@/data/firebase/booksApi";

export default {
  name: "MainBestsellersSection",
  components: {
    BorderedButton,
    BookCard,
  },
  data() {
    return {
      bestsellerBooksList: null,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.bestsellerBooksList = await getBooksByTag("bestseller", 3);
    },
  },
};
</script>

<style lang="scss" scoped>
.bestseller-books-list {
  margin-top: 40px;
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
