<template>
  <base-layout>
    <div class="main-content">
      <h3>Корзина</h3>
      <div class="cart-content-wrap">
        <div class="cart-items-list">
          <book-cart-card
            v-for="item in getCartItems"
            :key="item.item.id"
            :item="item"
            @alert="openAlert"
          />
        </div>
        <div class="cart-total-wrap">
          <div class="cart-total-content">
            <div class="cart-total-list">
              <div class="cart-total-list-item">
                <div>
                  {{
                    `${getCartItemsQuantity} ${
                      getCartItemsQuantity % 10 === 1 &&
                      getCartItemsQuantity !== 11
                        ? "книга"
                        : getCartItemsQuantity % 10 < 5 &&
                          getCartItemsQuantity % 10 !== 0 &&
                          (getCartItemsQuantity < 5 ||
                            getCartItemsQuantity > 15)
                        ? "книги"
                        : "книг"
                    }`
                  }}
                </div>
                <div>{{ getCartTotal }} ₽</div>
              </div>
              <div class="cart-total-list-item">
                <div>Доставка</div>
                <div>Бесплатно</div>
              </div>
            </div>
            <div class="cart-form">
              <div class="cart-total-price">
                <div>Итого</div>
                <div>{{ getCartTotal }} ₽</div>
              </div>
              <filled-button>Перейти к оформлению</filled-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <message-alert ref="alert"></message-alert>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import BookCartCard from "@/components/cards/BookCartCard.vue";
import { mapGetters } from "vuex";
import FilledButton from "@/components/buttons/FilledButton.vue";
import MessageAlert from "@/components/popups/MessageAlert.vue";

export default {
  components: {
    MessageAlert,
    FilledButton,
    BookCartCard,
    BaseLayout,
  },
  computed: {
    ...mapGetters({
      getCartItems: "cart/getCartItems",
      getCartTotal: "cart/getCartTotal",
      getCartItemsQuantity: "cart/getCartItemsQuantity",
    }),
  },
  methods: {
    openAlert(type, text) {
      this.$refs.alert.open(type, text);
    },
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  margin-top: 40px;

  h3 {
    text-align: center;
    margin-bottom: 40px;
  }

  .cart-content-wrap {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 60px;

    .cart-items-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .cart-total-wrap .cart-total-content {
      position: sticky;
      top: 20px;

      .cart-total-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--border-color);

        .cart-total-list-item {
          @include flex-between;
        }
      }
      .cart-form {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .cart-total-price {
          @include flex-between;
        }
      }
    }
  }
}
</style>
