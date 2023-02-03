<template>
  <div class="filter-item">
    <bordered-button
      color="gray"
      class="filter-title"
      :class="titleClass"
      @click="isOpen = !isOpen"
    >
      <slot class="text" name="title" />
      <arrow-icon />
    </bordered-button>
    <div class="options-wrap" :class="dropdownSide" v-if="isOpen">
      <slot name="options" />
    </div>
  </div>
</template>

<script>
import BorderedButton from "@/components/buttons/BorderedButton.vue";
import ArrowIcon from "@/assets/img/icons/ArrowIcon.vue";

export default {
  data() {
    return {
      isOpen: false,
    };
  },

  components: {
    ArrowIcon,
    BorderedButton,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    dropdownSide: {
      type: String,
      required: false,
      default: "left",
    },
  },

  mounted() {
    document.addEventListener("click", this.handleMouseClick);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleMouseClick);
  },

  computed: {
    titleClass() {
      return this.isOpen
        ? "active filter-title-" + this.id
        : "filter-title-" + this.id;
    },
  },

  methods: {
    handleMouseClick(e) {
      if (
        this.isOpen &&
        !e.target.classList.contains("filter-title-" + this.id) &&
        !e.target.classList.contains("option-item")
      ) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-item {
  position: relative;
  min-width: 150px;
  .filter-title {
    width: 100%;
    @include flex-between;
    border-radius: 0;
    border-width: 1px 0 1px 1px;
    .icon {
      width: 12px;
      height: 12px;
      margin-left: 15px;
      pointer-events: none;
    }
    &:hover {
      background: none;
    }
    &.active {
      .icon {
        transform: rotate(180deg);
      }
    }
  }
  .options-wrap {
    position: absolute;
    outline: 1px solid var(--border-color);
    border-radius: 5px;
    top: 130%;
    top: calc(100% + 7px);
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
    background: var(--background-color);
    min-width: 100%;
    width: max-content;
    max-width: 200px;
    max-height: 250px;
    overflow-y: auto;
    @include custom-scroll;
  }
}
</style>
