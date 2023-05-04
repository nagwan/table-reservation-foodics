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
    <div class="w-100 d-flex flex-wrap">
        <div class="col-12 col-md-4 m-y-20" v-for="i in 6" :key="i">
            <div class="shimmer-loader radius-8 loader-block"></div>
        </div>
    </div>
</template>
<style scoped lang='sass'>
.loader-block
    height: 250px
</style>
