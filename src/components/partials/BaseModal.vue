<script>
import Info from './icons/Info.vue';

export default {
  components: { Info },
  props: {
    title: {
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
        class="w-100 d-flex align-items-center justify-content-center modal-overlay"
    >
        <div
            class="col-12 col-md-6 col-lg-4 bg-white shadow-1 p-0 modal-container"
        >
            <div class="p-20 d-flex align-items-center modal-header">
                <Info />
                <p class="m-x-4 text-primary-50">{{ title }}</p>
            </div>
            <div class="w-100 bg-neutral-20 modal-body p-20">
                <slot />
            </div>
            <div
                class="p-20 d-flex align-items-center justify-content-end modal-footer"
            >
                <button
                    class="p-14 m-x-10 cursor-pointer bg-primary-50 border-primary-50 text-white radius-8 text-center fs-14 text-primary-regular"
                    @click="$emit('confirm')"
                >
                    <span>Confirm</span>
                </button>

                <button
                    class="p-14 bg-none cursor-pointer border-neutral-60 text-neutral-60 radius-8 text-center fs-14"
                    @click="$emit('cancel')"
                >
                    <span>Cancel</span>
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped lang='sass'>
.modal-overlay
  width: 100%
  height: 100vh
  position: fixed
  top: 0
  bottom: 0
  right: 0
  left: 0
  z-index: 99
  background: rgba(0,0,0,0.6)
  .modal-header,
  .modal-footer
    height: 80px
</style>
