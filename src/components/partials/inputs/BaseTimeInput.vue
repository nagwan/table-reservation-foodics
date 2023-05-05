<script>
export default {
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },

    inputId: {
      type: String,
      required: true,
    },

    min: {
      type: String,
      required: false,
      default: null,
    },
    max: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<template>
    <div class>
        <label :for="inputId">
            <input
                class="text-primary-light"
                type="time"
                :id="inputId"
                :value="value"
                :min="min"
                :max="max"
                @change="$emit('update:value', $event.target.value)"
            />
        </label>
    </div>
</template>
<style scoped lang='sass'>
input[type="time"]
    border: none !important
    background: none !important
    &:focus-visible
        outline: none !important
input[type="time"]::-webkit-calendar-picker-indicator
    background: none
    display: none
</style>
