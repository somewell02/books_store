<template>
  <div class="book-card-wrap">
    <div class="book-card-img">
      <img src="@/assets/img/95.jpeg" alt="book" />
    </div>
    <div class="book-card-content">
      <div class="book-card-info">
        <div class="book-title">Вязание ХИТОМИ ШИДА. 250 узоров</div>
        <stars-rating class="book-rating" rating="3" />
      </div>
      <div class="book-card-add-to-cart">
        <div class="book-price">1808 ₽</div>
        <add-to-cart-icon class="book-add-to-cart-icon" />
      </div>
    </div>
  </div>
</template>

<script>
import StarsRating from "@/components/other/StarsRating.vue";
import AddToCartIcon from "@/assets/img/icons/AddToCartIcon.vue";

export default {
  name: "BookCard",
  components: {
    AddToCartIcon,
    StarsRating,
  },
};
</script>

<style lang="scss" scoped>
.book-card-wrap {
  border: 1px solid var(--border-color);
  padding: 30px 20px;

  .book-card-img {
    width: 100%;
    height: 400px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .book-card-content {
    margin-top: 20px;
    display: flex;

    .book-card-info {
      flex-grow: 3;
      padding-right: 20px;

      .book-rating {
        margin-top: 10px;
      }
    }

    .book-card-add-to-cart {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex-shrink: 0;

      .book-price {
        font-weight: 600;
      }

      .book-add-to-cart-icon {
        margin-top: 12px;
        cursor: pointer;
      }
    }
  }
}
</style>
