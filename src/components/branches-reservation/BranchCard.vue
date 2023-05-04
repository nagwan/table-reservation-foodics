<script>
import API from '@/utils/API';
import BaseToggle from '../partials/inputs/BaseToggle.vue';
import Edit from '../partials/icons/Edit.vue';
import BaseModal from '../partials/BaseModal.vue';

export default {
  components: {
    BaseToggle,
    Edit,
    BaseModal,
  },
  props: {
    branch: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showConfirmationPopup: false,
      showBranchSettingsForm: false,
    };
  },
  computed: {
    getTablesCount() {
      let count = 0;
      this.branch.sections.forEach((section) => {
        count += section.tables.filter(
          (table) => table.accepts_reservations,
        ).length;
      });

      return count || '0';
    },
  },
  methods: {
    editBranchSettings() {
      this.$emit('edit-branch', { id: this.branch.id });
    },

    async disableBranchReservations() {
      /**
             * the API is not really updating the branch reservation status
             */
      await API({
        url: `branches/${this.branch.id}`,
        method: 'PUT',
        data: {
          accepts_reservations: !this.branch.accepts_reservations,
        },
      });

      this.$emit('fetch-branches');

      this.togglePopup();
    },

    togglePopup() {
      this.showConfirmationPopup = !this.showConfirmationPopup;
    },
  },
};
</script>
<template>
    <div class="w-100">
        <transition name="fade">
            <BaseModal
                title="Update Branch Reservation"
                v-if="showConfirmationPopup"
                @cancel="togglePopup"
                @confirm="disableBranchReservations"
            >
                <p class="text-primary-regular">
                    Are you sure you want to update the reservation settings for
                    {{ branch.name }}?!
                </p>
            </BaseModal>
        </transition>
        <div class="shadow-1 radius-8 p-20 branch-card">
            <p class="text-primary-50 text-center fs-24 text-primary-bold">
                {{ branch.name }}
            </p>
            <div class="d-flex align-items-center m-y-20">
                <p class="text-primary-medium">Branch Reference:</p>
                <p class="text-primary-semi-bold text-secondary-50 m-x-4">
                    {{ branch.reference }}
                </p>
            </div>

            <div class="d-flex align-items-center m-y-20">
                <p class="text-primary-medium">Available Tables:</p>
                <p class="text-primary-semi-bold text-secondary-50 m-x-4">
                    {{ getTablesCount }}
                </p>
            </div>

            <div class="d-flex align-items-center">
                <p class="text-primary-medium">Reservation Duration:</p>
                <p class="text-primary-semi-bold text-secondary-50 m-x-4">
                    {{ branch.reservation_duration }}
                </p>
            </div>

            <div
                class="d-flex align-items-center justify-content-end branch-actions m-t-30"
            >
                <Edit
                    class="m-x-10 cursor-pointer"
                    @click.native="editBranchSettings()"
                />
                <BaseToggle
                    :value="branch.accepts_reservations"
                    :name="'branch-reservation' + '-' + branch.id"
                    @update-value="togglePopup"
                />
            </div>
        </div>
    </div>
</template>
<style  lang='sass'>
.branch-card
  height: 250px
  position: relative
  .branch-actions
    position: relative
    bottom: 0
</style>
