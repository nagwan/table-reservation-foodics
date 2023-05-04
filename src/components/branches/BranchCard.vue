<script>
import BaseToggle from '../partials/inputs/BaseToggle.vue';
import Edit from '../partials/icons/Edit.vue';
import BaseModal from '../partials/BaseModal.vue';
import Building from '../partials/icons/Building.vue';
import Table from '../partials/icons/Table.vue';
import Clock from '../partials/icons/Clock.vue';

export default {
  components: {
    BaseToggle,
    Edit,
    BaseModal,
    Building,
    Table,
    Clock,
  },
  props: {
    branch: {
      type: Object,
      required: true,
    },
    enableEdit: {
      type: Boolean,
      required: false,
      default: true,
    },
    enableConfirmation: {
      type: Boolean,
      required: false,
      default: true,
    },

    isSelected: {
      type: Boolean,
      required: false,
      default: false,
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

    disableBranchReservations() {
      this.$emit('fetch-branches');

      this.togglePopup();
    },

    updateReservation() {
      this.$emit('update-reservation', {
        branchId: this.branch.id,
        value: !this.branch.accepts_reservations,
      });
    },

    togglePopup() {
      if (this.enableConfirmation) {
        this.showConfirmationPopup = !this.showConfirmationPopup;
      } else {
        this.updateReservation();
      }
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
                @confirm="updateReservation"
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
                <Building color="#f06a00" />
                <p class="text-primary-medium m-x-4">Branch Reference:</p>
                <p class="text-primary-semi-bold text-secondary-50 m-x-4">
                    {{ branch.reference }}
                </p>
            </div>

            <div class="d-flex align-items-center m-y-20">
                <Table color="#f06a00" />
                <p class="text-primary-medium m-x-4">Available Tables:</p>
                <p class="text-primary-semi-bold text-secondary-50 m-x-4">
                    {{ getTablesCount }}
                </p>
            </div>

            <div class="d-flex align-items-center">
                <Clock color="#f06a00" />
                <p class="text-primary-medium">Reservation Duration:</p>
                <p class="text-primary-semi-bold text-secondary-50 m-x-4">
                    {{ branch.reservation_duration }}
                </p>
            </div>

            <div
                class="d-flex align-items-center justify-content-end branch-actions m-t-30"
            >
                <Edit
                    v-if="enableEdit"
                    class="m-x-10 cursor-pointer"
                    @click.native="editBranchSettings()"
                />
                <BaseToggle
                    :value="branch.accepts_reservations || isSelected"
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
