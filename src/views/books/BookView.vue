<template>
  <base-layout>
    <div class="main-content">
      <div v-if="book" class="book-page-wrap">
        <div class="book-gallery-wrap">
          <div class="book-gallery">
            <div class="book-main-image">
              <img :src="book.gallery[0]" :alt="book.title" />
            </div>
          </div>
        </div>
        <div class="book-info-wrap">
          <div class="book-title-wrap">
            <div class="book-title-author">
              <h3 class="book-title">{{ book.title }}</h3>
              <div class="book-author">{{ book.author }}</div>
            </div>
            <div class="book-age-limit">{{ book.ageLimit }}</div>
          </div>
          <div class="book-description-wrap">
            <div class="book-description-caption caption">Описание</div>
            <div class="book-description">
              <p>{{ book.description }}</p>
            </div>
            <div class="book-specifications-list">
              <template v-for="item in bookSpecifications">
                <div
                  v-if="book[item.key]"
                  :key="`specification-${item.key}`"
                  class="book-specifications-list-item"
                >
                  <div class="specification-label">{{ item.label }}</div>
                  <div class="specification-value">{{ book[item.key] }}</div>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="book-actions-wrap">
          <div class="book-actions">
            <div class="book-add-to-cart-form">
              <div class="book-price-rating">
                <div class="book-price">{{ book.price }} ₽</div>
                <stars-rating :rating="book.rating" class="book-rating" />
              </div>
              <filled-button
                v-if="isBookInStock"
                class="add-to-cart-btn"
                @click="addToCart"
              >
                Добавить в корзину
              </filled-button>
              <div class="book-is-in-stock">
                <template v-if="isBookInStock">
                  <check-icon />
                  В наличии
                </template>
                <template v-else>
                  <close-icon class="error-icon" />
                  Нет в наличии
                </template>
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
import { getBookById } from "@/data/firebase/booksApi";
import FilledButton from "@/components/buttons/FilledButton.vue";
import CheckIcon from "@/assets/img/icons/CheckIcon.vue";
import CloseIcon from "@/assets/img/icons/CloseIcon.vue";
import StarsRating from "@/components/other/StarsRating.vue";
import MessageAlert from "@/components/popups/MessageAlert.vue";

export default {
  name: "BookView",
  components: {
    MessageAlert,
    StarsRating,
    CloseIcon,
    CheckIcon,
    FilledButton,
    BaseLayout,
  },
  data() {
    return {
      bookId: this.$route.params.id,
      book: null,
      bookSpecifications: [
        { label: "Издательство", key: "publishing" },
        { label: "Год", key: "releaseYear" },
        { label: "Страниц", key: "pages" },
        { label: "Переплёт", key: "binding" },
        { label: "Формат", key: "format" },
        { label: "Автор", key: "author" },
        { label: "Тематика", key: "theme" },
      ],
    };
  },
  created() {
    this.initData();
  },
  computed: {
    isBookInStock() {
      return this.book.quantityInStock > 0;
    },
  },
  methods: {
    async initData() {
      this.book = await getBookById(this.bookId);
    },
    addToCart() {
      this.$store.commit("cart/addCartItem", { id: this.bookId, ...this.book });
      this.$refs.alert.open("success", "Книга добавлена в корзину");
    },
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  margin-top: 40px;

  .book-page-wrap {
    display: grid;
    grid-template-columns: 300px 1fr 340px;
    gap: 40px;

    .book-gallery-wrap .book-gallery {
      position: sticky;
      top: 20px;

      .book-main-image img {
        width: 100%;
      }
    }

    .book-info-wrap {
      padding-right: 20px;

      .book-title-wrap {
        display: flex;
        align-items: flex-start;

        .book-title {
          font-size: 22px;
        }

        .book-author {
          margin-top: 10px;
        }

        .book-age-limit {
          font-size: 12px;
          line-height: 22px;
          color: var(--secondary-color);
          border: 1px solid var(--secondary-color);
          padding: 0 8px;
          border-radius: 4px;
          margin-left: 18px;
        }
      }

      .book-description-wrap {
        margin-top: 30px;

        .book-description-caption {
          color: var(--secondary-color);
          margin-bottom: 10px;
        }

        .book-specifications-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 30px;

          .book-specifications-list-item {
            display: flex;

            .specification-label {
              width: 180px;
              flex-shrink: 0;
              color: var(--secondary-color);
            }
          }
        }
      }
    }

    .book-actions-wrap .book-actions {
      position: sticky;
      top: 20px;

      .book-add-to-cart-form {
        background: var(--primary-light-color);
        padding: 22px 24px;

        .book-price-rating {
          @include flex-between;

          .book-price {
            font-size: 28px;
            font-weight: bold;
          }
        }

        .add-to-cart-btn {
          margin-top: 18px;
        }

        .book-is-in-stock {
          margin-top: 18px;
          display: flex;
          font-size: 14px;

          .icon {
            margin-right: 12px;
          }

          .error-icon :deep(svg *) {
            stroke: var(--error-color);
          }
        }
      }
    }
  }
}
</style>
