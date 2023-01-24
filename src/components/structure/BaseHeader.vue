<template>
  <header class="base-header">
    <div class="header-main container">
      <div class="header-logo">
        <router-link :to="{ name: 'main' }">
          <img src="@/assets/img/logo.svg" alt="logo" class="logo-img" />
        </router-link>
      </div>
      <nav class="header-menu">
        <router-link :to="{ name: 'main' }" class="header-menu-item">
          Главная
        </router-link>
        <router-link :to="{ name: 'books-catalog' }" class="header-menu-item">
          Каталог
        </router-link>
        <router-link :to="{ name: 'delivery' }" class="header-menu-item">
          Оплата и доставка
        </router-link>
        <router-link :to="{ name: 'feedback' }" class="header-menu-item">
          Обатная связь
        </router-link>
      </nav>
      <div class="right-menu-wrap">
        <div class="cart-btn">
          <router-link :to="{ name: 'cart' }">
            <cart-icon />
          </router-link>
          <div v-if="cartItemsQuantity !== 0" class="cart-items-quantity">
            {{ cartItemsQuantity }}
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import CartIcon from "@/assets/img/icons/CartIcon.vue";
import { mapGetters } from "vuex";

export default {
  name: "BaseHeader",
  components: {
    CartIcon,
  },
  computed: {
    ...mapGetters({
      cartItemsQuantity: "cart/getCartItemsQuantity",
    }),
  },
};
</script>

<style lang="scss" scoped>
.base-header {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;

  .header-main {
    @include flex-between;
    width: 100%;
    padding: 24px 0;

    .header-logo {
      display: flex;

      .logo-img {
        width: 170px;
      }
    }

    .header-menu {
      display: flex;
      align-items: center;
      gap: 40px;

      .header-menu-item {
        color: var(--text-color);

        &:hover {
          color: var(--primary-color);
        }
      }
    }

    .right-menu-wrap {
      .cart-btn {
        position: relative;

        .cart-items-quantity {
          position: absolute;
          left: 18px;
          top: 18px;
          color: var(--primary-color);
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
