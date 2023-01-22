<template>
  <div class="icon stroke">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      viewBox="0 0 152 152"
      xml:space="preserve"
    >
      <g
        transform="matrix(1.4999999999999998,0,0,1.5,-38.050006866455064,-37.99999999999994)"
      >
        <path
          d="M85.4 64.3c-.2-.6-.6-1.2-1.2-1.6s-1.3-.6-2-.7c-1-.1-2-.2-2.9-.2-1 0-2.1 0-3.1.2-.7.1-1.5.3-2.1.7s-1 .9-1.2 1.6c-.3.9-.4 1.8-.4 2.7v7.7l-6 13.5c-.1.3-.2.6-.2.9s.2.5.4.6c.4.2.8.3 1.3.4.8.1 1.5.1 2.3.1.7 0 1.4 0 2.1-.1.5-.1 1-.2 1.4-.3s.7-.3 1-.5.5-.5.8-.8l6.6-9.4c.6-.9 1.2-1.8 1.7-2.8.9-1.8 1.5-3.8 1.8-5.8.1-1.2.2-2.4.2-3.5-.1-1-.3-1.9-.5-2.7z"
          fill="#000000"
          data-original="#000000"
        ></path>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "marker-icon",
};
</script>

<style lang="scss" scoped>
.icon {
  @include flex-center;
  width: 32px;
  height: 32px;

  * {
    fill: var(--primary-color);
  }
}
</style>
