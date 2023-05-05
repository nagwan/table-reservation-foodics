<script>
import BranchCard from './BranchCard.vue';
import BaseSideBar from '../partials/BaseSideBar.vue';

export default {
  components: {
    BaseSideBar,
    BranchCard,
  },
  props: {
    branches: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      selectedBranches: [],
    };
  },
  computed: {
    availableBranches() {
      return (
        this.branches.filter(
          (branch) => !branch.accepts_reservations,
        ) || []
      );
    },
  },
  methods: {
    hideForm() {
      this.$emit('hide-form');
    },

    selectBranches() {
      this.$emit('add-branches', { branches: this.selectedBranches });
    },

    selectBranch({ branchId }) {
      if (this.selectedBranches.includes(branchId)) {
        this.selectedBranches = this.selectedBranches.filter(
          (branch) => branch !== branchId,
        );
      } else {
        this.selectedBranches = [...this.selectedBranches, branchId];
      }
    },
  },
};
</script>
<template>
    <BaseSideBar
        title="Add Branch(s)"
        @confirm="selectBranches"
        @close="hideForm"
    >
        <div
            class="col-12 m-b-40"
            v-for="branch in availableBranches"
            :key="branch.id"
        >
            <BranchCard
                :branch="branch"
                :isSelected="selectedBranches.includes(branch.id)"
                :enableEdit="false"
                :enableConfirmation="false"
                @update-reservation="selectBranch"
            />
        </div>
    </BaseSideBar>
</template>
<style scoped lang='sass'></style>
