<script>
import Settings from '../partials/icons/Settings.vue';

export default {
  components: { Settings },
  props: {},
  data() {
    return {
      showActionsList: false,
    };
  },
  computed: {},
  methods: {
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
    <div class="settings-container">
        <Settings class="cursor-pointer" @click.native="toggleActionsList" v-click-outside="hideActionsList"/>
        <transition name="fade">
            <div
                v-if="showActionsList"
                class="shadow-1 bg-white radius-4 p-14 actions-list"
            >
                <div>
                    <button class="btn cursor-pointer text-primary-50">
                        <span>Add Branch</span>
                    </button>
                </div>

                <div class="w-100 m-y-10 bg-secondary-20 line-separator"></div>
                <div>
                    <button class="btn cursor-pointer text-primary-50">
                        <span>Disable All Reservations</span>
                    </button>
                </div>
            </div>
        </transition>
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
