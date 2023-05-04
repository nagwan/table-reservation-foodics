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
    <div class="content-container">
        <div class="w-100 page-hero">
            <div class="hero-overlay"></div>
            <div class="here-content">
                <header class="p-10">
                    <img
                        alt="Dunkin Donuts"
                        src="@/assets/images/dunkindonuts.png"
                        width="200"
                    />
                </header>
                <div
                    class="w-100 d-flex flex-column align-items-center justify-content-center hero-text-container"
                >
                    <h1 class="fs-40 text-white text-primary-bold">Welcome</h1>
                    <h2 class="m-y-30 fs-30 text-white text-primary-bold">
                        Branches Reservations
                    </h2>
                </div>
            </div>
        </div>
        <div class="container m-y-40">
            <slot />
        </div>
        <footer class="w-100 p-20">
            <div class="w-100 d-flex align-items-center justify-content-center">
                <p class="text-primary-regular text-neutral-60 fs-12">
                    Powered by
                </p>
                <img
                    alt="Foodics"
                    src="@/assets/images/foodics.png"
                    width="30"
                />
            </div>
        </footer>
    </div>
</template>
<style scoped lang='sass'>
.content-container
    .container
        min-height: 50vh
    .page-hero
        height: 40vh
        background: url("@/assets/images/hero.webp")
        background-repeat: no-repeat
        background-position: center
        background-size: cover
        position: relative
        .hero-overlay
            position: absolute
            width: 100%
            height: 100%
            background: rgba(0,0,0,0.6)
        .here-content
            position: relative
            z-index: 2
            height: 100%
            .hero-text-container
                height: 70%
</style>
