<template>
  <base-layout>
    <div class="main-content">
      <h3>Оформление заказа</h3>
      <div class="checkout-content-wrap">
        <template v-if="getCartItemsQuantity === 0">
          Корзина пуста. Добавьте сначала товары в корзину.
        </template>
        <template v-else>
          <div class="checkout-form-wrap">
            <form-layout class="checkout-form" @submit.prevent="submitCheckout">
              <div class="form-block">
                <h4>Контактная информация</h4>
                <div class="form-block-inputs">
                  <text-input
                    class="input-item column-1"
                    v-model="order.name"
                    placeholder="ФИО получателя"
                    required
                  />
                  <text-input
                    class="input-item column-12"
                    v-model="order.email"
                    placeholder="E-mail"
                    required
                  />
                  <text-input
                    class="input-item column-12"
                    v-model="order.phone"
                    placeholder="Телефон"
                    required
                  />
                </div>
                <div class="form-block">
                  <h4>Информация о доставке</h4>
                  <div class="form-block-inputs">
                    <text-input
                      class="input-item column-12"
                      v-model="order.address.city"
                      placeholder="Город"
                      required
                    />
                    <text-input
                      class="input-item column-12"
                      v-model="order.address.street"
                      placeholder="Улица"
                      required
                    />
                    <text-input
                      class="input-item column-13"
                      v-model="order.address.home"
                      placeholder="Дом"
                      required
                    />
                    <text-input
                      class="input-item column-13"
                      v-model="order.address.building"
                      placeholder="Корпус"
                      required
                    />
                    <text-input
                      class="input-item column-13"
                      v-model="order.address.flat"
                      placeholder="Квартира"
                      required
                    />
                    <text-input
                      class="input-item column-1"
                      v-model="order.address.note"
                      placeholder="Примечания к доставке"
                    />
                  </div>
                </div>
              </div>
              <div class="form-block">
                <h4>Способ оплаты</h4>
                <div class="form-block-inputs">
                  <radio-list
                    class="input-item column-1"
                    name="payment"
                    v-model="order.payment"
                    :options="[
                      { id: 'bank-card', title: 'Картой на сайте' },
                      {
                        id: 'upon-receipt',
                        title: 'Наличными или картой при получении',
                      },
                      {
                        id: 'bank-transfer',
                        title: 'Банковский перевод для юридических лиц',
                      },
                    ]"
                  />
                </div>
              </div>
              <div class="form-block">
                <h4>Комментарии к заказу</h4>
                <div class="form-block-inputs">
                  <bordered-textarea
                    class="input-item column-1"
                    v-model="order.note"
                    placeholder="Оставьте ваш комментарий"
                  />
                </div>
              </div>
              <filled-button type="submit" class="checkout-submit-btn">
                Подтвердить заказ
              </filled-button>
            </form-layout>
          </div>
          <div class="checkout-total-wrap">
            <div class="checkout-items-list">
              <book-cart-card
                v-for="item in getCartItems"
                :key="item.item.id"
                :item="item"
                :is-checkout="true"
              />
              <div class="checkout-total-content">
                <div class="checkout-total-list">
                  <div class="checkout-total-list-item">
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
                  <div class="checkout-total-list-item">
                    <div>Доставка</div>
                    <div>Бесплатно</div>
                  </div>
                </div>
                <div class="checkout-total-price">
                  <div>Итого</div>
                  <div>{{ getCartTotal }} ₽</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <message-alert ref="alert"></message-alert>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import BookCartCard from "@/components/cards/BookCartCard.vue";
import { mapGetters } from "vuex";
import MessageAlert from "@/components/popups/MessageAlert.vue";
import FormLayout from "@/layouts/FormLayout.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import BorderedTextarea from "@/components/inputs/BorderedTextarea.vue";
import RadioList from "@/components/inputs/RadioList.vue";
import FilledButton from "@/components/buttons/FilledButton.vue";

export default {
  data() {
    return {
      order: {
        name: "",
        email: "",
        phone: "",
        address: {
          city: "",
          street: "",
          home: "",
          building: "",
          flat: "",
          note: "",
        },
        payment: "bank-card",
        note: "",
      },
    };
  },
  components: {
    FilledButton,
    RadioList,
    BorderedTextarea,
    TextInput,
    FormLayout,
    MessageAlert,
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
    submitCheckout() {
      console.log("submit");
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

  .checkout-content-wrap {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 60px;

    .checkout-form-wrap {
      .checkout-form {
        .checkout-submit-btn {
          margin-top: 30px;
        }
      }
    }

    .checkout-total-wrap {
      .checkout-items-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .checkout-total-content {
        position: sticky;
        top: 20px;

        .checkout-total-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);

          .checkout-total-list-item {
            @include flex-between;
          }
        }

        .checkout-total-price {
          margin-top: 20px;
          @include flex-between;
        }
      }
    }
  }
}
</style>
