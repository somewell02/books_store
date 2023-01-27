<template>
  <div class="radio-list">
    <div
      class="radio-list-item"
      v-for="option in options"
      :key="option.id"
      @click="option.disabled ? null : selectOption(option)"
    >
      <input
        type="radio"
        :name="name"
        class="radio-list-item-input"
        :checked="option.id === modelValue"
      />
      <label class="radio-list-item-label">
        {{ option.title ?? option.id }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "radio-list",
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  methods: {
    selectOption(option) {
      this.$emit("update:modelValue", option.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-list {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .radio-list-item {
    cursor: pointer;
    display: flex;

    .radio-list-item-label {
      display: flex;
      align-items: center;
      cursor: pointer;

      &:before {
        content: "";
        width: 7px;
        height: 7px;
        outline: 1px solid VAR(--text-color);
        outline-offset: 4px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }

    .radio-list-item-input {
      display: none;

      &:checked + .radio-list-item-label:before {
        background: var(--text-color);
      }
    }
  }
}
</style>
