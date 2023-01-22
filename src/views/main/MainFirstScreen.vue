<template>
  <div class="first-screen-wrap" v-if="newBook">
    <div class="first-screen-content">
      <div class="first-screen-caption caption">Новый выпуск</div>
      <h2>{{ newBook.title }}</h2>
      <div class="first-screen-description">{{ newBook.shortDescription }}</div>
      <div class="first-screen-actions">
        <filled-button class="first-screen-actions-item">Купить</filled-button>
        <router-link :to="{ name: 'main' }" class="first-screen-actions-item">
          <bordered-button>Подробнее</bordered-button>
        </router-link>
        <router-link :to="{ name: 'main' }" class="first-screen-actions-item">
          <bordered-button>Каталог</bordered-button>
        </router-link>
      </div>
    </div>
    <div class="first-screen-img">
      <img :src="newBook.gallery[0]" alt="new release" />
    </div>
  </div>
</template>

<script>
import FilledButton from "@/components/buttons/FilledButton.vue";
import BorderedButton from "@/components/buttons/BorderedButton.vue";
import { getBooksByTag } from "@/data/firebase/booksApi";

export default {
  name: "MainFirstScreen",
  components: {
    BorderedButton,
    FilledButton,
  },
  data() {
    return {
      newBook: null,
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const result = await getBooksByTag("new", 1);
      this.newBook = result[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.first-screen-wrap {
  height: calc(100vh - 100px);
  padding: 10px 0 60px 0;
  display: flex;

  .first-screen-content {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 60px;

    h2 {
      margin-top: 30px;
    }

    .first-screen-description {
      margin-top: 30px;
      line-height: 1.5;
    }

    .first-screen-actions {
      margin-top: 30px;
      display: flex;
      gap: 20px;

      .first-screen-actions-item {
        width: 150px;

        button {
          width: 100%;
        }
      }
    }
  }

  .first-screen-img {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;

    img {
      height: 100%;
      max-width: 500px;
      object-fit: contain;
    }
  }
}
</style>
