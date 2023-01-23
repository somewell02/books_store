<template>
  <footer class="base-footer">
    <div class="footer-main container">
      <div class="footer-logo">
        <router-link :to="{ name: 'main' }">
          <img src="@/assets/img/logo.svg" alt="logo" class="logo-img" />
        </router-link>
      </div>
      <div class="footer-menu">
        <nav class="footer-menu-item footer-menu-store">
          <div class="menu-title">Магазин</div>
          <router-link :to="{ name: 'main' }"> Главная </router-link>
          <router-link :to="{ name: 'books-catalog' }"> Каталог </router-link>
        </nav>
        <nav class="footer-menu-item footer-menu-about">
          <div class="menu-title">Информация</div>
          <router-link :to="{ name: 'delivery' }">
            Оплата и доставка
          </router-link>
          <router-link :to="{ name: 'feedback' }"> Обатная связь </router-link>
        </nav>
      </div>
      <div class="footer-contacts">
        <div class="footer-contacts-item place-info">
          <place-icon />
          Саратов
        </div>
        <div class="footer-contacts-item phone-info">
          <phone-icon />
          +7 (951) 123-45-67
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copyright">
        Copyright @ 2022 BookStore | Powered by BookStore
      </div>
    </div>
  </footer>
</template>

<script>
import PlaceIcon from "@/assets/img/icons/PlaceIcon.vue";
import PhoneIcon from "@/assets/img/icons/PhoneIcon.vue";

export default {
  name: "BaseFooter",
  components: {
    PhoneIcon,
    PlaceIcon,
  },
};
</script>

<style lang="scss" scoped>
.base-footer {
  background: var(--text-color);
  margin-top: 120px;

  .footer-main {
    display: flex;
    padding: 24px 0;

    .footer-logo {
      display: flex;

      .logo-img {
        width: 185px;
        filter: brightness(100);
      }
    }

    .footer-menu {
      flex-grow: 3;
      display: flex;
      padding: 0 80px;
      gap: 40px;

      .footer-menu-item {
        display: flex;
        flex-direction: column;
        flex-grow: 2;
        align-items: center;
        gap: 15px;

        a {
          color: #9c9c9c;

          &:hover {
            color: var(--background--text-color);
          }
        }

        .menu-title {
          font-weight: 600;
          color: var(--background--text-color);
        }
      }
    }

    .footer-contacts {
      display: flex;
      flex-direction: column;
      gap: 15px;

      .footer-contacts-item {
        display: flex;
        align-items: center;
        color: var(--background--text-color);

        .icon {
          margin-right: 10px;
        }
      }
    }
  }

  .footer-bottom {
    padding: 40px 0 20px;

    .footer-copyright {
      display: flex;
      justify-content: center;
      color: #9c9c9c;
      font-size: 14px;
    }
  }
}
</style>
