<script>
import Close from './icons/Close.vue';

export default {
  components: { Close },
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
    <div class="side-bar-overlay">
        <div
            class="col-12 col-md-6 col-lg-4 col-xl-3 bg-white shadow-1 side-bar-container"
        >
            <div class="d-flex align-items-center justify-content-between">
                <p class="text-primary-extra-bold text-primary-50 fs-30">
                    {{ title }}
                </p>
                <Close class="cursor-pointer" @click.native="$emit('close')" />
            </div>

            <div class="m-y-40 content-container">
                <slot />
            </div>

            <div
                class="p-20 d-flex align-items-center justify-content-end bar-footer"
            >
                <button
                    class="p-14 m-x-10 cursor-pointer bg-primary-50 border-primary-50 text-white radius-8 text-center fs-14 text-primary-regular"
                    @click="$emit('confirm')"
                >
                    <span>Confirm</span>
                </button>

                <button
                    class="p-14 bg-none cursor-pointer border-neutral-60 text-neutral-60 radius-8 text-center fs-14"
                    @click="$emit('close')"
                >
                    <span>Cancel</span>
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped lang='sass'>
.side-bar-overlay
    width: 100%
    height: 100vh
    position: fixed
    top: 0
    bottom: 0
    right: 0
    left: 0
    z-index: 5
    background: rgba(0,0,0,0.6)
.side-bar-container
    position: fixed
    right: 0
    height: 100vh
    top: 0
    z-index: 3
    padding: 20px !important
.content-container
    height: 85%
    overflow-y: scroll !important
.bar-footer
    position: fixed
    bottom: 0
    right: 0
</style>
