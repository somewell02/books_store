<template>
  <base-layout>
    <div class="main-content">
      <h3>Обратная связь</h3>
      <div class="feedback-wrap">
        <form class="feedback-form-wrap" @submit.prevent="submitFeedback">
          <only-text-input
            v-model="feedback.name"
            placeholder="ФИО*"
            required
          />
          <email-input
            v-model="feedback.email"
            placeholder="E-mail*"
            required
          />
          <phone-input v-model="feedback.phone" placeholder="Телефон" />
          <bordered-textarea
            v-model="feedback.message"
            placeholder="Сообщение"
          />
          <filled-button type="submit"> Отправить </filled-button>
        </form>
        <div class="feedback-contacts-wrap">
          <div class="contacts-item">
            <div class="contacts-item-icon">
              <phone-icon />
            </div>
            {{ storeData.phone }}
          </div>
          <div class="contacts-item">
            <div class="contacts-item-icon">
              <email-icon />
            </div>
            {{ storeData.email }}
          </div>
          <div class="contacts-item">
            <div class="contacts-item-icon">
              <place-icon />
            </div>
            {{ storeData.city }}
          </div>
        </div>
      </div>
    </div>
    <message-alert ref="alert"></message-alert>
  </base-layout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import BorderedTextarea from "@/components/inputs/BorderedTextarea.vue";
import FilledButton from "@/components/buttons/FilledButton.vue";
import PhoneIcon from "@/assets/img/icons/PhoneIcon.vue";
import { phone, email, city } from "@/data/data";
import PlaceIcon from "@/assets/img/icons/PlaceIcon.vue";
import EmailIcon from "@/assets/img/icons/EmailIcon.vue";
import { addFeedback } from "@/data/firebase/feedbackApi";
import MessageAlert from "@/components/popups/MessageAlert.vue";
import EmailInput from "@/components/inputs/EmailInput.vue";
import PhoneInput from "@/components/inputs/PhoneInput.vue";
import OnlyTextInput from "@/components/inputs/OnlyTextInput.vue";

export default {
  data() {
    return {
      feedback: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
    };
  },
  components: {
    OnlyTextInput,
    PhoneInput,
    EmailInput,
    MessageAlert,
    EmailIcon,
    PlaceIcon,
    PhoneIcon,
    FilledButton,
    BorderedTextarea,
    BaseLayout,
  },
  computed: {
    storeData() {
      return { phone, email, city };
    },
  },
  methods: {
    submitFeedback() {
      addFeedback(this.feedback)
        .then(() => {
          this.$refs.alert.open("success", "Ваше сообщение успешно отправлено");
          this.feedback.name = "";
          this.feedback.email = "";
          this.feedback.phone = "";
          this.feedback.message = "";
        })
        .catch(() => {
          this.$refs.alert.open(
            "error",
            "Произошла ошибка при отправке сообщения"
          );
        });
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

  .feedback-wrap {
    max-width: 900px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 330px;
    gap: 80px;

    .feedback-form-wrap {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  .feedback-contacts-wrap {
    padding-left: 80px;
    margin: 30px 0;
    border-left: 1px solid var(--primary-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;

    .contacts-item {
      display: flex;
      align-items: center;

      .contacts-item-icon {
        background: var(--primary-color);
        width: 50px;
        height: 50px;
        @include flex-center;
        border-radius: 50%;
        margin-right: 25px;
      }
    }
  }
}
</style>
