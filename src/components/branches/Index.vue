<script>
import API from '@/utils/API';
import BranchCard from './BranchCard.vue';
import BranchesFilter from './BranchesFilter.vue';
import BranchesSettings from './BranchesSettings.vue';
import AddBranch from './AddBranch.vue';
import Loader from './Loader.vue';
import BaseEmptyStatus from '../partials/BaseEmptyStatus.vue';

export default {
  components: {
    BranchCard,
    BranchesFilter,
    BranchesSettings,
    AddBranch,
    Loader,
    BaseEmptyStatus,
  },
  props: {},
  data() {
    return {
      branches: [],
      pagination: {},
      showForm: false,
      isLoading: false,
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
      this.isLoading = true;
      const { data, status } = await API({
        url: 'branches?include[0]=sections&include[1]=sections.tables',
      });

      if (status !== 200) {
        this.$root.toggleAlert({
          type: 'error',
          message: data.message,
        });
      } else {
        this.branches = data.data;
        this.pagination = data.meta;
      }

      this.isLoading = false;
    },

    disableAllBranchesReservations() {
      /**
             * it would be better if there is an API takes an array of ids and update all of them with one request
             */
      this.branches.forEach((branch) => {
        if (branch.accepts_reservations) {
          this.updateBranchReservations({
            branchId: branch.id,
            value: false,
          });
        }
      });

      this.fetchBranches();
    },

    async updateBranchReservations({ branchId, value, refetch }) {
      /**
             * the API is not updating the branch reservation status
             */
      await API({
        url: `branches/${branchId}`,
        method: 'PUT',
        data: {
          accepts_reservations: value,
        },
      });

      /**
             * this does not make sense in our case as the API
             * is not actually updating values
             */
      if (refetch) {
        this.fetchBranches();
      }
    },

    toggleForm() {
      this.showForm = !this.showForm;
    },

    updateBranchesFilterValue({ value }) {
      this.selectedFilterValue = value;
    },

    addBranches({ branches }) {
      /**
             * As mention in the bulk disable reservation case
             * it would be better if the API accepts an array of branches ids
             * and update all of them in one request
             */
      branches.forEach((branch) => {
        this.updateBranchReservations({
          branchId: branch,
          value: true,
        });
      });

      this.showForm = false;
      this.fetchBranches();
    },
  },
};
</script>
<template>
    <div class="w-100">
        <transition name="fade">
            <AddBranch
                v-if="showForm"
                :branches="branches"
                @hide-form="toggleForm"
                @add-branches="addBranches"
            />
        </transition>

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
                <BranchesSettings
                    @add-branch="toggleForm"
                    @disable-all-branches-reservations="
                        disableAllBranchesReservations
                    "
                />
            </div>
        </div>

        <loader v-if="isLoading" />

        <BaseEmptyStatus
            class="m-t-50"
            v-else-if="!isLoading && !branches.length"
        />

        <div
            class="w-100 d-flex flex-wrap"
            v-else-if="!isLoading && branches.length"
        >
            <div
                class="col-12 col-md-4 m-y-20"
                v-for="branch in getBranches"
                :key="branch.id"
            >
                <BranchCard
                    :branch="branch"
                    :enableEdit="branch.accepts_reservations"
                    @refetch-branches="fetchBranches"
                    @update-reservation="
                        (args) =>
                            updateBranchReservations({ refetch: true, ...args })
                    "
                />
            </div>
        </div>
    </div>
</template>
<style scoped lang='sass'></style>
