<script>
import Settings from '../partials/icons/Settings.vue';
import BaseModal from '../partials/BaseModal.vue';

export default {
  components: {
    Settings,
    BaseModal,
  },
  props: {},
  data() {
    return {
      showActionsList: false,
      showConfirmationPopup: false,
    };
  },
  computed: {},
  methods: {
    addBranch() {
      this.$emit('add-branch');
    },

    disableAllBranchesReservations() {
      this.showConfirmationPopup = true;
    },

    confirm() {
      this.$emit('disable-all-branches-reservations');
      this.showConfirmationPopup = false;
    },

    cancel() {
      this.showConfirmationPopup = false;
    },

    toggleActionsList() {
      this.showActionsList = !this.showActionsList;
    },

    hideActionsList() {
      this.showActionsList = false;
    },
  },
};
</script>
<template>
    <div>
        <transition name="fade">
            <BaseModal
                title="Disable All Branches Reservations"
                v-if="showConfirmationPopup"
                @cancel="cancel"
                @confirm="confirm"
            >
                <p class="text-primary-regular">
                    Are you sure you want to disable all branches reservations?!
                </p>
            </BaseModal>
        </transition>
        <div class="settings-container">
            <Settings
                class="cursor-pointer"
                @click.native="toggleActionsList"
                v-click-outside="hideActionsList"
            />
            <transition name="fade">
                <div
                    v-if="showActionsList"
                    class="shadow-1 bg-white radius-4 p-14 actions-list"
                >
                    <div>
                        <button class="btn cursor-pointer text-primary-50" @click="addBranch">
                            <span>Add Branch</span>
                        </button>
                    </div>

                    <div
                        class="w-100 m-y-10 bg-secondary-20 line-separator"
                    ></div>
                    <div>
                        <button class="btn cursor-pointer text-primary-50" @click="disableAllBranchesReservations">
                            <span>Disable All Reservations</span>
                        </button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<style scoped lang='sass'>
.settings-container
    position: relative
.actions-list
    position: absolute
    width: 200px
    right: 0
    z-index: 2
.line-separator
    height: 1px
</style>
