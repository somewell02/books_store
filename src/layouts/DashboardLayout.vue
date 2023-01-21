<template>
  <div class="dashboard-layout-wrap preloader-wrap">
    <div v-if="$store.state.user.user" class="app-content">
      <dashboard-navbar class="dashboard-navbar" />
      <div class="dashboard-main-wrap">
        <dashboard-header />
        <main class="dashboard-main-content">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardHeader from "@/components/structure/DashboardHeader.vue";
import DashboardNavbar from "@/components/structure/DashboardNavbar.vue";
export default {
  name: "DashboardLayout",
  components: {
    DashboardNavbar,
    DashboardHeader,
  },
};
</script>

<style lang="scss" scoped>
.dashboard-layout-wrap {
  position: relative;
  .preloader {
    top: calc(50vh - 30px);
  }
}
.app-content {
  display: flex;
  width: 100%;
  min-height: 100vh;
  .dashboard-navbar,
  .dashboard-main-wrap {
    padding: 40px 40px 0 40px;
    height: 100vh;
    overflow-y: auto;
  }
  .dashboard-navbar {
    width: 100%;
    max-width: 280px;
    border: solid var(--border-color);
    border-width: 0 1px 0 0;
    @include custom-scroll();
  }
  .dashboard-main-wrap {
    flex-grow: 3;
    @include custom-scroll(#ececec, #8c8c8c);
  }
}
</style>
