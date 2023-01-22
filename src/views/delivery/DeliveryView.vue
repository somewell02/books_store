<template>
  <base-layout>
    <div class="main-content">
      <section class="delivery-section">
        <h3>Как получить заказ</h3>

        <p>
          Время доставки зависит от выбранного вами способа доставки и
          удаленности вашего города от г. Саратов.
        </p>

        <p>
          Срок комплектации всех заказов от 1 до 7 дней на складе в городе
          Саратов. Кроме книг по услуге печать по требованию.
        </p>

        <p>
          Срок доставки считается как: срок комплектации + время доставки до
          Вашего города.
        </p>

        <p>После того как заказ упакован, он передается в службу доставки.</p>

        <p>
          Доставка осуществляется только по территории Российской Федерации.
        </p>

        <p>Мы предлагаем вам на выбор следующие способы доставки заказа:</p>
        <div class="info-list-wrap">
          <div
            v-for="item in delivery"
            :key="item.title"
            class="info-list-item"
          >
            <marker-icon />
            <div class="list-text">
              <div class="list-text-title">{{ item.title }}</div>
              <div class="list-text-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </section>
      <section class="payment-section">
        <h3>Как оплатить</h3>
        <p>Мы предлагаем вам на выбор несколько способов оплаты заказа:</p>
        <div class="info-list-wrap">
          <div v-for="item in payment" :key="item.title" class="info-list-item">
            <marker-icon />
            <div class="list-text">
              <div class="list-text-title">{{ item.title }}</div>
              <div class="list-text-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import MarkerIcon from "@/assets/img/icons/MarkerIcon.vue";

export default {
  data() {
    return {
      delivery: [
        {
          title: "Заберите через постамат или в пункте выдачи",
          desc: "Стоимость доставки от 125 рублей",
        },
        {
          title: "Курьерская доставка",
          desc: "Стоимость доставки от 350 рублей",
        },
      ],
      payment: [
        {
          title: "Наличными или картой при получении",
          desc: "Карты принимают в некоторых пунктах выдачи и при получении курьером",
        },
        {
          title: "Картой на сайте",
          desc: "Оплата происходит через ПАО СБЕРБАНК с использованием банковских карт следующих платёжных систем: МИР, VISA International, Mastercard Worldwide, JCB",
        },
        {
          title: "Банковский перевод для юридических лиц",
          desc: "При выборе этого способа оплаты вам будет необходимо на странице создания заказа заполнить несколько дополнительных граф, чтобы мы могли сделать для вас счёт.",
        },
      ],
    };
  },
  components: {
    MarkerIcon,
    BaseLayout,
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

  .payment-section {
    margin-top: 40px;
  }

  .info-list-wrap {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    .info-list-item {
      display: flex;
      margin-bottom: 20px;

      .list-text {
        margin-left: 5px;
        margin-top: 3px;

        .list-text-title {
          font-size: 20px;
        }

        .list-text-desc {
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
