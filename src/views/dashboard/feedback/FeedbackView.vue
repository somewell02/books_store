<template>
  <dashboard-layout>
    <div class="list-modifications">
      <div class="search-wrap">
        <search-input v-model="search" />
      </div>
    </div>
    <spacing-bordered-table
      class="feedbacks-table"
      v-if="feedbacksList && modifiedFeedbacksList().length > 0"
      :titles="tableInfo.titles"
      :rows="modifiedFeedbacksList()"
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
import { tableInfo, searchInfo } from "./feedbackConstants.js";
import { getFeedbacks } from "@/data/firebase/feedbackApi";
import { paginate, recordsCount, search, sort } from "@/services/methods/list";
import SpacingBorderedTable from "@/components/lists/SpacingBorderedTable.vue";
import MessageAlert from "@/components/popups/MessageAlert.vue";
import FilledPagination from "@/components/paginations/FilledPagination.vue";
import SearchInput from "@/components/inputs/SearchInput.vue";

export default {
  name: "FeedbackView",
  data() {
    return {
      feedbacksList: null,
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
    DashboardLayout,
  },
  created() {
    this.initData();
  },
  computed: {
    tableInfo() {
      return tableInfo;
    },
    searchInfo() {
      return searchInfo;
    },
  },
  methods: {
    async initData() {
      const feedbacks = await getFeedbacks();
      this.feedbacksList = feedbacks;
      this.pagination.length = Math.ceil(
        feedbacks.length / this.pagination.limit
      );
    },
    modifiedFeedbacksList() {
      if (!this.feedbacksList?.length) return [];

      let feedbacks = Object.assign(this.feedbacksList);

      // feedbacks.forEach((feedback) => {
      //   feedback.messageDisplay = feedback.createdDate
      //     ? msToDayMonthYear(feedback.createdDate.seconds * 1000)
      //     : "-";
      // });

      if (this.search)
        feedbacks = search(feedbacks, this.searchInfo, this.search);

      if (this.sort !== "default") feedbacks = sort(feedbacks, this.sort);

      const feedbacksLength = feedbacks.length;

      feedbacks = paginate(feedbacks, this.pagination);

      this.dataCount = recordsCount(this.pagination, feedbacksLength);

      return feedbacks;
    },
    openAlert(type, text) {
      this.$refs.alert.open(type, text);
    },
  },
  watch: {
    feedbacksList(newValue) {
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
  display: flex;
  justify-content: flex-end;
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
