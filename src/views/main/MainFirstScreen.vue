<template>
  <div class="first-screen-wrap">
    <div class="first-screen-content">
      <div class="first-screen-caption caption">Новый выпуск</div>
      <h2>Вязание ХИТОМИ ШИДА, 250 узоров, 6 авторских моделей</h2>
      <div class="first-screen-description">
        Расширенная и переработанная версия первой и основной книги
        первопроходца японского стиля вязания ХИТОМИ ШИДЫ с авторской коллекцией
        узоров, потрясающими дизайнами и вариантами классических паттернов.
      </div>
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
      <img src="@/assets/img/95.jpeg" alt="new release" />
    </div>
  </div>
</template>

<script>
import FilledButton from "@/components/buttons/FilledButton.vue";
import BorderedButton from "@/components/buttons/BorderedButton.vue";

export default {
  name: "MainFirstScreen",
  components: {
    BorderedButton,
    FilledButton,
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
    }
  }
}
</style>
