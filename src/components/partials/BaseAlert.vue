<script>
import Info from './icons/Info.vue';

export default {
  components: { Info },
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
        <info :color="type === 'success' ? '#01B574' : '#E31A1A'" />
        <p
            class="m-x-6"
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
  z-index: 9
</style>
