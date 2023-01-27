<template>
  <form class="form-wrap">
    <slot />
  </form>
</template>

<script>
export default {};
</script>

<style lang="scss">
.form-wrap {
  .form-block {
    &:not(:first-child) {
      margin-top: 40px;
    }

    h4 {
      font-family: inherit;
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 30px;
    }

    .form-block-inputs {
      display: flex;
      flex-wrap: wrap;
      gap: 30px;

      .input-item {
        flex-grow: 0;
        flex-shrink: 0;

        &.column-1 {
          width: 100%;
        }
        &.column-13 {
          width: calc((100% - 60px) / 3);
        }
        &.column-12 {
          width: calc((100% - 30px) / 2);
        }
        &.column-23 {
          width: calc((100% - 15px) / 3 * 2);
        }
      }
    }
  }
}
</style>
