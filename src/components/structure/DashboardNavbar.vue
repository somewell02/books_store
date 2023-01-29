<template>
  <div class="dashboard-navbar">
    <header class="dashboard-layout-header dashboard-navbar-header">
      <img src="@/assets/img/logo.svg" alt="logo" />
    </header>
    <nav class="main-menu">
      <router-link-icon :to="{ name: 'admin-orders' }">
        <list-icon />
        Заказы
      </router-link-icon>
      <router-link-icon :to="{ name: 'admin-users' }">
        <users-icon />
        Пользователи
      </router-link-icon>
      <div class="hr"></div>
      <icon-button @click="logout">
        <logout-icon />
        Выйти
      </icon-button>
    </nav>
    <confirmation-popup ref="confirmation" />
  </div>
</template>

<script>
import RouterLinkIcon from "@/components/buttons/RouterLinkIcon";
import IconButton from "@/components/buttons/IconButton";
import LogoutIcon from "@/assets/img/icons/LogoutIcon";
import ConfirmationPopup from "@/components/popups/ConfirmationPopup.vue";
import ListIcon from "@/assets/img/icons/ListIcon.vue";
import UsersIcon from "@/assets/img/icons/UsersIcon.vue";
// import { logout } from "@/data/firebase/auth";
export default {
  name: "DashboardNavbar",
  components: {
    UsersIcon,
    ListIcon,
    RouterLinkIcon,
    IconButton,
    LogoutIcon,
    ConfirmationPopup,
  },
  methods: {
    async logout() {
      //   const popupResult = await this.$refs.confirmation.open(
      //     this.$t("auth.confirmLogout")
      //   );
      //   if (popupResult) {
      //     logout();
      //   }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-navbar-header {
  height: 80px;
  padding: 0 20px;
}
.main-menu {
  display: flex;
  flex-direction: column;
  .hr {
    width: 100%;
    height: 0.5px;
    background: var(--border-color);
    margin: 10px 0 20px 0;
  }
}
</style>
