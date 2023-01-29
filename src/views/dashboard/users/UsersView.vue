<template>
  <dashboard-layout>
    <div class="list-modifications">
      <div class="sorts-wrap">
        <bordered-select
          v-model="sort"
          :options="sortInfo.options"
          prefix="Сортировать:"
          dropdownSide="left"
        />
      </div>
      <div class="search-wrap">
        <search-input v-model="search" />
      </div>
    </div>
    <spacing-bordered-table
      class="users-table"
      v-if="usersList && modifiedUsersList().length > 0"
      :titles="tableInfo.titles"
      :rows="modifiedUsersList()"
      :actions="tableInfo.actions"
    />
    <div class="pagination-wrap">
      <div class="count-title">
        {{ dataCount }}
      </div>
      <filled-pagination
        :length="pagination.length"
        v-model="pagination.page"
      />
    </div>
    <message-alert ref="alert"></message-alert>
  </dashboard-layout>
</template>

<script>
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import BorderedSelect from "@/components/dropdowns/BorderedSelect.vue";

import { tableInfo, sortInfo, searchInfo } from "./usersConstants.js";
import { paginate, recordsCount, search, sort } from "@/services/methods/list";
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable.vue";
import MessageAlert from "@/components/popups/MessageAlert.vue";
import FilledPagination from "@/components/paginations/FilledPagination.vue";
import SearchInput from "@/components/inputs/SearchInput.vue";
import { getUsers } from "@/data/firebase/usersApi";

export default {
  name: "OrdersView",
  data() {
    return {
      usersList: null,
      search: "",
      sort: "default",
      pagination: {
        page: 1,
        limit: 8,
        length: 0,
      },
      dataCount: "",
    };
  },
  components: {
    SearchInput,
    FilledPagination,
    MessageAlert,
    SpacingBorderedTable,
    BorderedSelect,
    DashboardLayout,
  },
  created() {
    this.initData();
  },
  computed: {
    sortInfo() {
      return sortInfo;
    },
    tableInfo() {
      return tableInfo;
    },
    searchInfo() {
      return searchInfo;
    },
  },
  methods: {
    async initData() {
      const users = await getUsers();
      this.usersList = users;
      this.pagination.length = Math.ceil(users.length / this.pagination.limit);
    },
    modifiedUsersList() {
      if (!this.usersList?.length) return [];

      let users = Object.assign(this.usersList);

      if (this.search) users = search(users, this.searchInfo, this.search);

      if (this.sort !== "default") users = sort(users, this.sort);

      const ordersLength = users.length;

      users = paginate(users, this.pagination);

      this.dataCount = recordsCount(this.pagination, ordersLength);

      return users;
    },
    openAlert(type, text) {
      this.$refs.alert.open(type, text);
    },
  },
  watch: {
    usersList(newValue) {
      if (newValue && newValue.length === 0) {
        this.dataCount = "Заказов не найдено";
      }
    },
    sort: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
    },
    search: {
      handler() {
        this.pagination.page = 1;
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.list-modifications {
  margin-bottom: 20px;
  @include flex-between;
}
.pagination-wrap {
  margin-top: 30px;
  @include flex-between;
  .count-title {
    color: var(--text-color);
    font-size: 14px;
  }
}
</style>
