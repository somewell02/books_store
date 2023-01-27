<template>
  <div class="book-cart-card-wrap">
    <div v-if="item.item.gallery" class="book-cart-card-img">
      <router-link :to="{ name: 'book-page', params: { id: item.item.id } }">
        <img :src="item.item.gallery[0]" :alt="`book-${item.item.id}`" />
      </router-link>
    </div>
    <div class="book-cart-card-info">
      <div class="book-title">
        <router-link :to="{ name: 'book-page', params: { id: item.item.id } }">
          {{ item.item.title }}
        </router-link>
      </div>
      <div class="book-author">
        {{ item.item.author }}
      </div>
      <template v-if="isCheckout">
        <div class="book-quantity">Количество: {{ item.quantity }}</div>
        <div class="book-total-price">
          {{ item.item.price * item.quantity }} ₽
        </div>
      </template>
    </div>
    <div v-if="!isCheckout" class="book-cart-card-quantity-wrap">
      <div class="book-cart-card-quantity">
        <bordered-button
          class="quantity-btn"
          @click="decItemQuantity(item.item)"
        >
          -
        </bordered-button>
        {{ item.quantity }}
        <bordered-button
          class="quantity-btn"
          @click="incItemQuantity(item.item)"
        >
          +
        </bordered-button>
      </div>
    </div>
    <div v-if="!isCheckout" class="book-cart-card-total-price">
      {{ item.item.price * item.quantity }} ₽
    </div>
    <div v-if="!isCheckout" class="book-cart-card-actions">
      <div class="delete-card-item" @click="deleteItem">
        <delete-icon />
      </div>
    </div>
  </div>
</template>

<script>
import BorderedButton from "@/components/buttons/BorderedButton.vue";
import DeleteIcon from "@/assets/img/icons/DeleteIcon.vue";
import { mapMutations } from "vuex";

export default {
  name: "BookCartCard",
  components: {
    DeleteIcon,
    BorderedButton,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    isCheckout: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: {
    alert: null,
  },
  methods: {
    ...mapMutations({
      addCartItem: "cart/addCartItem",
      decCartItem: "cart/decCartItem",
      deleteCartItem: "cart/deleteCartItem",
      incItemQuantity() {
        if (this.item.quantity >= this.item.item.quantityInStock) return;
        this.addCartItem(this.item.item);
      },
      decItemQuantity() {
        if (this.item.quantity <= 1) return;
        this.decCartItem(this.item.item);
      },
      deleteItem() {
        this.$emit("alert", "success", "Книга удалена из корзины");
        this.deleteCartItem(this.item.item);
      },
    }),
  },
};
</script>

<style lang="scss" scoped>
.book-cart-card-wrap {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 20px;
  display: flex;
  gap: 40px;

  .book-cart-card-img {
    flex-shrink: 0;
    width: 150px;
    height: 200px;

    a {
      display: flex;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: top center;
      }
    }
  }

  .book-cart-card-info {
    flex-grow: 3;
    display: flex;
    flex-direction: column;

    .book-title {
      font-size: 18px;

      a {
        color: var(--text-color);

        &:hover {
          color: var(--primary-color);
        }
      }
    }

    .book-author {
      margin-top: 10px;
      flex-grow: 3;
    }

    .book-total-price {
      margin-top: 10px;
    }
  }

  .book-cart-card-quantity-wrap .book-cart-card-quantity {
    display: flex;
    align-items: center;
    gap: 10px;

    .quantity-btn {
      min-width: auto;
      height: auto;
      padding: 5px 10px;
    }
  }

  .book-cart-card-quantity-wrap,
  .book-cart-card-actions,
  .book-cart-card-total-price {
    flex-shrink: 0;
  }
  .book-cart-card-actions {
    .delete-card-item {
      cursor: pointer;
    }
  }
}
</style>
