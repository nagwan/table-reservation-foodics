<script>
import API from '@/utils/API';
import BaseSideBar from '../partials/BaseSideBar.vue';
import BaseInput from '../partials/inputs/BaseInput.vue';
import Errors from '../../services/Errors';
import BaseCheckbox from '../partials/inputs/BaseCheckbox.vue';
import BaseEmptyStatus from '../partials/BaseEmptyStatus.vue';
import metadata from './data';
import Trash from '../partials/icons/Trash.vue';
import Plus from '../partials/icons/Plus.vue';
import BaseTimeInput from '../partials/inputs/BaseTimeInput.vue';

export default {
  components: {
    BaseSideBar,
    BaseInput,
    BaseCheckbox,
    BaseEmptyStatus,
    Trash,
    Plus,
    BaseTimeInput,
  },
  props: {
    branch: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        reservation_duration: '',
        tables: [],
        reservation_times: {
          saturday: [],
          sunday: [],
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
        },
      },
      errors: new Errors({}),
    };
  },
  computed: {
    getTables() {
      let tables = [];
      this.branch.sections.forEach((section) => {
        tables = [...tables, ...section.tables];
      });

      return tables;
    },

    weekDays() {
      return metadata;
    },
  },
  methods: {
    hideForm() {
      this.$emit('hide-form');
    },

    addSlot({ day }) {
      this.form.reservation_times[day].push([
        this.branch.opening_from,
        this.branch.opening_to,
      ]);
    },

    /**
         * it would be better if we depend on something else rather than index
         * such as a unique id for each slot
         */
    removeSlot({ index, day }) {
      this.form.reservation_times[day] = this.form.reservation_times[
        day
      ].filter((_, i) => i !== index);
    },

    applySatSlotsToAllDays() {
      const staValues = JSON.stringify(this.form.reservation_times.saturday);
      Object.keys(this.form.reservation_times).forEach((day) => {
        this.form.reservation_times[day] = JSON.parse(staValues);
      });
    },

    /**
         * in a real word app we would have validation utils
         * and tracking errors system,
         * but will be a bit verbose if we did that for a single required input
         */
    validateRequiredInputs() {
      if (!this.form.reservation_duration) {
        this.$root.toggleAlert({
          type: 'error',
          message: 'Please add a reservation duration!',
        });
      } else {
        this.updateSettings();
      }
    },

    async updateSettings() {
      const { data, status } = await API({
        url: `branches/${this.branch.id}`,
        method: 'PUT',
        data: {
          accepts_reservations: true,
          ...this.form,
        },
      });

      if (status !== 200) {
        this.$root.toggleAlert({
          type: 'error',
          message: data.message,
        });
      } else {
        this.$emit('changes-saved');
      }
    },
  },
};
</script>
<template>
    <BaseSideBar
        title="Update Settings"
        @confirm="validateRequiredInputs"
        @close="hideForm"
    >
        <!-- branch working hours hint -->
        <div
            class="text-secondary-50 bg-secondary-10 text-center radius-4 p-10"
        >
            <span class="text-primary-bold">{{ branch.name }}</span>
            <span class="m-x-4"> working hours are</span>
            <span class="text-primary-bold">{{ branch.opening_from }}</span>
            <span class="m-r-4"> :</span>
            <span class="text-primary-bold">{{ branch.opening_to }}</span>
        </div>

        <!-- Form fields -->

        <div class="m-y-30">
            <BaseInput
                type="number"
                :value.sync="form.reservation_duration"
                isRequired
                inputId="reservation_duration"
                label="Reservation Duration (minutes)"
                placeholder="Reservation Duration (minutes)"
            />
        </div>

        <template>
            <p class="text-secondary-50 m-b-10">Tables</p>
            <div
                class="bg-neutral-10 p-10 radius-4 d-flex flex-wrap"
                v-if="getTables.length"
            >
                <div
                    class="col-12 col-md-6 m-y-10"
                    v-for="table in getTables"
                    :key="table.id"
                >
                    <BaseCheckbox
                        :inputId="table.id"
                        :inputValue="table.id"
                        :value.sync="form.tables"
                        :label="table.name"
                        class=""
                    />
                </div>
            </div>
            <BaseEmptyStatus v-else />
        </template>

        <!-- Reservation Slots -->
        <div class="m-y-30">
            <div class="m-y-20" v-for="day in weekDays" :key="day.value">
                <div class="d-flex justify-content-between">
                    <p class="text-secondary-50 m-b-10">{{ day.label }}</p>
                    <button
                        @click="applySatSlotsToAllDays"
                        v-if="day.value === 'saturday'"
                        class="btn cursor-pointer text-primary-50 text-primary-bold text-underline"
                    >
                        <span class="fs-16"> Apply to All Days</span>
                    </button>
                </div>
                <div class="bg-neutral-10 p-10 radius-4 d-flex flex-wrap">
                    <div class="w-100 d-flex justify-content-end">
                        <button
                            @click="addSlot({ day: day.value })"
                            class="d-flex align-items-center border-secondary-50 radius-8 cursor-pointer"
                        >
                            <Plus color="#c73662" />
                        </button>
                    </div>

                    <div
                        class="d-flex flex-wrap justify-content-between"
                        v-if="form.reservation_times[day.value].length"
                    >
                        <div
                            class="border-secondary-50 radius-8 p-10 m-y-10 m-x-4 d-flex align-items-center justify-content-between slot-container"
                            v-for="(slot, i) in form.reservation_times[
                                day.value
                            ]"
                            :key="i"
                        >
                            <template>
                                <BaseTimeInput
                                    :value.sync="slot[0]"
                                    :inputId="day.value + '_' + i"
                                />
                                <span class="m-x-2"> - </span>
                                <BaseTimeInput
                                    :value.sync="slot[1]"
                                    :inputId="day.value + '_' + i"
                                    :min="slot[0]"
                                />
                            </template>

                            <Trash
                                class="m-l-10 cursor-pointer"
                                @click.native="
                                    removeSlot({ index: i, day: day.value })
                                "
                            />
                        </div>
                    </div>
                    <p class="" v-else>Add Available Reservation Slots</p>
                </div>
            </div>
        </div>
    </BaseSideBar>
</template>
<style scoped lang='sass'>
.slot-container
    width: 185px
</style>
