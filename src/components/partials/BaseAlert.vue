<script>
export default {
  components: {},
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['success', 'error'].includes(value);
      },
    },
    message: {
      type: String,
      required: true,
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
    <div
        class="col-12 col-md-6 col-lg-4 radius-4 d-flex align-items-center alert-container p-10"
        :class="[type === 'success' ? 'bg-success-20' : 'bg-danger-20']"
    >
        <p
            :class="[
                type === 'success' ? 'text-success-100' : 'text-danger-100',
            ]"
        >
            {{ message }}
        </p>
    </div>
</template>
<style scoped lang='sass'>
.alert-container
  height: 50px
  position: fixed
  top: 0
  right: 0
  z-index: 4
</style>
