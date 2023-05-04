<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<template>
    <div class>
        <header class="shadow-1 p-20 d-flex align-items-center">Logo</header>
        <div>
            <slot />
        </div>
        <footer class="w-100 p-20">
            <div class="w-100 d-flex align-items-center justify-content-center">
                <p class="text-primary-regular text-neutral-60 fs-12">
                    Powered by
                </p>
                <img alt="Foodics" src="@/assets/images/foodics.png" width="30" />
            </div>
        </footer>
    </div>
</template>
<style scoped lang='sass'>
header
  height: 80px
footer
  position: fixed
  bottom: 0
</style>
