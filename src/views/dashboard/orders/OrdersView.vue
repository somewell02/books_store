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
      class="orders-table"
      v-if="ordersList && modifiedOrdersList().length > 0"
      :titles="tableInfo.titles"
      :rows="modifiedOrdersList()"
      :actions="tableInfo.actions"
    />
    <div class="pagination-wrap">
      <div class="count_title">
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

import { tableInfo, sortInfo, searchInfo } from "./ordersConstants.js";
import { getOrders, orderStatuses } from "@/data/firebase/ordersApi";
import { paginate, recordsCount, search, sort } from "@/services/methods/list";
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable.vue";
import MessageAlert from "@/components/popups/MessageAlert.vue";
import FilledPagination from "@/components/paginations/FilledPagination.vue";
import SearchInput from "@/components/inputs/SearchInput.vue";
import { msToDayMonthYear } from "@/services/methods/datetime";

export default {
  name: "OrdersView",
  data() {
    return {
      ordersList: null,
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
      const orders = await getOrders();
      this.ordersList = orders;
      this.pagination.length = Math.ceil(orders.length / this.pagination.limit);
    },
    modifiedOrdersList() {
      if (!this.ordersList?.length) return [];

      let orders = Object.assign(this.ordersList);

      orders.forEach((order) => {
        order.createdDateDisplay = order.createdDate
          ? msToDayMonthYear(order.createdDate.seconds * 1000)
          : "-";

        order.statusDisplay = order.status
          ? orderStatuses.find((item) => item.id === order.status).title
          : "-";
      });

      if (this.search) orders = search(orders, this.searchInfo, this.search);

      if (this.sort !== "default") orders = sort(orders, this.sort);

      const ordersLength = orders.length;

      orders = paginate(orders, this.pagination);

      this.dataCount = recordsCount(this.pagination, ordersLength);

      return orders;
    },
    openAlert(type, text) {
      this.$refs.alert.open(type, text);
    },
  },
  watch: {
    ordersList(newValue) {
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
  .count_title {
    color: var(--text-color);
    font-size: 14px;
  }
}
.tabs_content_wrap {
  padding-bottom: 40px;
  position: relative;
}
</style>
