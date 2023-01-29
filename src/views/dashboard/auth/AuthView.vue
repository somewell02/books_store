<template>
  <center-layout class="auth-page-wrap">
    <div class="auth-container container">
      <img src="@/assets/img/logo.svg" alt="logo" class="main-logo" />
      <h2>Авторизация</h2>
      <div class="auth-form">
        <text-input v-model="login" name="login" placeholder="Логин" />
        <password-input
          v-model="password"
          name="password"
          placeholder="Пароль"
        />
        <filled-button @click="auth"> Войти </filled-button>
      </div>
    </div>
    <message-alert ref="alert"></message-alert>
  </center-layout>
</template>

<script>
import CenterLayout from "@/layouts/CenterLayout.vue";
import PasswordInput from "@/components/inputs/PasswordInput.vue";
import { getAuth } from "@/data/firebase/auth";
import TextInput from "@/components/inputs/TextInput.vue";
import FilledButton from "@/components/buttons/FilledButton.vue";
import MessageAlert from "@/components/popups/MessageAlert.vue";
export default {
  data() {
    return {
      login: "",
      password: "",
    };
  },
  components: {
    MessageAlert,
    FilledButton,
    TextInput,
    CenterLayout,
    PasswordInput,
  },
  methods: {
    async auth() {
      if (!this.login || !this.password) {
        await this.$refs.alert.open("error", "Введите email и пароль");
      } else {
        const res = await getAuth(this.login, this.password);
        switch (res) {
          case "auth/invalid-email":
            await this.$refs.alert.open(
              "error",
              "Электронная почта введена некорректно"
            );
            break;
          case "auth/user-not-found":
            await this.$refs.alert.open(
              "error",
              "Пользователя с введеной почтой не существует"
            );
            break;
          case "auth/wrong-password":
            await this.$refs.alert.open("error", "Неверный пароль");
            break;
          case "no-access":
            await this.$refs.alert.open("error", "Доступ запрещен");
            break;
          case "access":
            this.$router.push({ name: "admin-orders" });
            break;
          default:
            await this.$refs.alert.open("error", "Ошибка входа");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.auth-container {
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 520px;
  border: 1px solid var(--border-color);
  border-radius: 12px;

  @include media-sm {
    padding: 60px 30px;
  }
  @include media-xs {
    padding: 60px 20px;
  }
  .main-logo {
    margin-bottom: 40px;
    width: 180px;
  }
  h2 {
    font-size: 36px;
    font-family: "Gabriela", serif;
    font-weight: 400;
  }
  .auth-form {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
    input {
      margin-bottom: 20px;
    }
    .error-message {
      color: red;
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
</style>
