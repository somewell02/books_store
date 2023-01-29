<template>
  <base-layout>
    <div class="main-content">
      <h3>Заказ №{{ orderId.slice(0, 6) }}</h3>
      <div v-if="isLoaded" class="order-content-wrap">
        <div class="order-info-wrap">
          <div class="thanks-for-order">
            <check-icon />
            <p>
              Спасибо за заказ! Он успешно создан и принят в работу. Мы свяжемся
              с вами в ближайшее время для уточнения деталей.
            </p>
          </div>
          <section class="order-info-section">
            <h4>Получение заказа</h4>
            <p>Адрес: {{ orderAddress }}</p>
            <p v-if="order.address.note">
              Примечание: {{ order.address.note }}
            </p>
          </section>
          <section class="order-info-section">
            <h4>Способ оплаты</h4>
            <p>{{ orderPayment }}</p>
          </section>
          <section class="order-info-section">
            <h4>Контактные данные</h4>
            <p>{{ order.userName }}</p>
            <p>{{ order.userEmail }}</p>
            <p>{{ order.userPhone }}</p>
          </section>
          <filled-button
            class="back-to-main-btn"
            @click="$router.push({ name: 'main' })"
          >
            Перейти на главную
          </filled-button>
        </div>
        <div class="order-total-wrap">
          <div class="order-items-list">
            <book-cart-card
              v-for="item in getOrderItems"
              :key="item.item.id"
              :item="item"
              :is-checkout="true"
            />
            <div class="order-total-content">
              <div class="order-total-list">
                <div class="order-total-list-item">
                  <div>
                    {{
                      `${getOrderItemsQuantity} ${
                        getOrderItemsQuantity % 10 === 1 &&
                        getOrderItemsQuantity !== 11
                          ? "книга"
                          : getOrderItemsQuantity % 10 < 5 &&
                            getOrderItemsQuantity % 10 !== 0 &&
                            (getOrderItemsQuantity < 5 ||
                              getOrderItemsQuantity > 15)
                          ? "книги"
                          : "книг"
                      }`
                    }}
                  </div>
                  <div>{{ getOrderTotal }} ₽</div>
                </div>
                <div class="order-total-list-item">
                  <div>Доставка</div>
                  <div>Бесплатно</div>
                </div>
              </div>
              <div class="order-total-price">
                <div>Итого</div>
                <div>{{ getOrderTotal }} ₽</div>
              </div>
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
import MessageAlert from "@/components/popups/MessageAlert.vue";
import { getBooksByIds } from "@/data/firebase/booksApi";
import { getOrderById, orderPayments } from "@/data/firebase/ordersApi";
import CheckIcon from "@/assets/img/icons/CheckIcon.vue";
import FilledButton from "@/components/buttons/FilledButton.vue";

export default {
  data() {
    return {
      orderId: this.$route.params.id,
      order: null,
      isLoaded: false,
    };
  },
  components: {
    FilledButton,
    CheckIcon,
    MessageAlert,
    BookCartCard,
    BaseLayout,
  },
  computed: {
    getOrderItems() {
      return this.order ? this.order.items : [];
    },
    getOrderTotal() {
      return this.order
        ? this.order.items.reduce(
            (sum, item) => sum + item.quantity * item.item.price,
            0
          )
        : 0;
    },
    getOrderItemsQuantity() {
      return this.order
        ? this.order.items.reduce((sum, item) => sum + item.quantity, 0)
        : 0;
    },
    orderAddress() {
      const { city, street, home, building, flat } = this.order.address;
      return `г. ${city}, ${street}, д. ${home}, к. ${building}, кв. ${flat}`;
    },
    orderPayment() {
      return orderPayments.find((item) => item.id === this.order.payment).title;
    },
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      this.order = await getOrderById(this.orderId);

      const orderItemsIds = this.order.items.map((item) => item.itemId);
      const items = await getBooksByIds(orderItemsIds);

      this.order.items = this.order.items.map((orderItem) => ({
        item: items.find((item) => item.id === orderItem.itemId),
        ...orderItem,
      }));

      this.isLoaded = true;
    },
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

  .order-content-wrap {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 60px;

    .order-info-wrap {
      .thanks-for-order {
        display: flex;
        max-width: 600px;

        .icon {
          width: 30px;
          height: 30px;
          margin-right: 30px;
          flex-shrink: 0;
        }
      }

      .order-info-section {
        margin-top: 40px;

        h4 {
          margin-bottom: 15px;
          font-size: 18px;
        }
      }

      .back-to-main-btn {
        margin-top: 30px;
        width: 300px;
      }
    }

    .order-total-wrap {
      .order-items-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .order-total-content {
        position: sticky;
        top: 20px;

        .order-total-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-color);

          .order-total-list-item {
            @include flex-between;
          }
        }

        .order-total-price {
          margin-top: 20px;
          @include flex-between;
        }
      }
    }
  }
}
</style>
