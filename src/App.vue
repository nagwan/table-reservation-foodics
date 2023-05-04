<script>
import API from '@/utils/API';
import BranchesList from './components/branches-reservation/Index.vue';

export default {
  components: {
    BranchesList,
  },
  props: {},
  data() {
    return {
      branches: [],
      pagination: {},
    };
  },
  computed: {
    getBranches() {
      return this.branches;
    },
  },
  mounted() {
    this.fetchBranches();
  },
  methods: {
    async fetchBranches() {
      const data = await API({
        url: 'branches?include[0]=sections&include[1]=sections.tables',
      });

      this.branches = data.data;
      this.pagination = data.meta;
    },
  },
};
</script>
<template>
    <Layout>

        <BranchesList :branches="getBranches" />
    </Layout>
</template>
<style scoped lang='sass'>
</style>
