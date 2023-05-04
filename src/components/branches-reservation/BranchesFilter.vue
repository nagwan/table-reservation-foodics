<script>
import BaseRadio from '../partials/inputs/BaseRadio.vue';

export default {
  components: {
    BaseRadio,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    updateSelectedValue({ value }) {
      this.$emit('update-value', { value });
    },
  },
};
</script>
<template>
    <div class="d-flex">
        <BaseRadio
            name="branches-filter"
            value="all"
            label="All"
            :selected="value"
            @update-value="updateSelectedValue"
        />
        <BaseRadio
            class="m-x-10"
            name="branches-filter"
            value="accepts_reservations"
            label="Accepts Reservation"
            :selected="value"
            @update-value="updateSelectedValue"
        />
    </div>
</template>
<style scoped lang='sass'></style>
