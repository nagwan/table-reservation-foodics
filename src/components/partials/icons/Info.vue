<script>
export default {
  components: {},
  props: {
    color: {
      type: String,
      required: false,
      default: '#667085',
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<template>
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            :stroke="color"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>
<style scoped lang='sass'>
svg
    &:hover
        path
            fill: #f06a00 !important

</style>
