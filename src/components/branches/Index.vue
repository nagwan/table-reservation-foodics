<script>
import API from '@/utils/API';
import BranchCard from './BranchCard.vue';
import BranchesFilter from './BranchesFilter.vue';
import BranchesSettings from './BranchesSettings.vue';

export default {
  components: {
    BranchCard,
    BranchesFilter,
    BranchesSettings,
  },
  props: {},
  data() {
    return {
      branches: [],
      pagination: {},
      selectedFilterValue: 'accepts_reservations',
    };
  },
  computed: {
    /**
         * in real world app this has to be done via API call,
         * but as the API does not accept accepts_reservations param,
         * the filtration will be done client side
         */
    getBranches() {
      let value = this.branches;

      if (this.selectedFilterValue === 'accepts_reservations') {
        value = this.branches.filter(
          (branch) => branch.accepts_reservations,
        );
      }
      return value;
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

    updateBranchesFilterValue({ value }) {
      this.selectedFilterValue = value;
    },
  },
};
</script>
<template>
    <div class="w-100">
        <div
            class="m-y-20 d-flex flex-wrap align-items-center justify-content-between"
        >
            <div class="col-auto">
                <BranchesFilter
                    :value="selectedFilterValue"
                    @update-value="updateBranchesFilterValue"
                />
            </div>
            <div class="col-auto">
                <BranchesSettings />
            </div>
        </div>
        <div class="w-100 d-flex flex-wrap">
            <div
                class="col-12 col-md-4 m-y-20"
                v-for="branch in getBranches"
                :key="branch.id"
            >
                <BranchCard :branch="branch" @fetch-branches="fetchBranches" />
            </div>
        </div>
    </div>
</template>
<style scoped lang='sass'></style>
