<script>
import Branches from './components/branches/Index.vue';
import BaseAlert from './components/partials/BaseAlert.vue';

export default {
  components: {
    Branches,
    BaseAlert,
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<template>
    <Layout>
        <Branches />
        <transition name="fade">
            <BaseAlert v-if="$root.showAlert" :type="$root.alertType" :message="$root.alertMessage" />
        </transition>
    </Layout>
</template>
<style scoped lang='sass'>
</style>
