<template>
  <header class="dashboard-layout-header">
    <div class="title">
      <h1>{{ $route.meta.title }}</h1>
    </div>
    <div class="info-wrap">
      <div class="profile">
        <div class="avatar">
          <default-avatar />
        </div>
        <div class="profile-info">
          <p class="name">
            {{
              this.$store.state.user.user
                ? this.$store.state.user.user.name
                : ""
            }}
          </p>
          <p class="role">Администратор</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import DefaultAvatar from "@/assets/img/DefaultAvatar";
export default {
  name: "DashboardHeader",
  components: {
    DefaultAvatar,
  },
};
</script>

<style lang="scss" scoped>
.dashboard-layout-header {
  height: 80px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .info-wrap {
    display: flex;
    .profile {
      display: flex;
      align-items: center;
      margin-left: 20px;
      .avatar {
        width: 40px;
        height: 40px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
      .profile-info {
        margin-left: 10px;
        p {
          font-size: 14px;
          margin: 0;
          &:not(:last-child) {
            margin-bottom: 2px;
          }
          &.name {
            font-weight: 500;
          }
          &.role {
            font-weight: 400;
            color: #aeaeae;
          }
        }
      }
    }
  }
}
</style>
