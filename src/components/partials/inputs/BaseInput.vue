<script>
export default {
  components: {},
  props: {
    type: {
      type: String,
      required: false,
      default: 'text',
      validator(value) {
        return ['text', 'number'].includes(value);
      },
    },
    value: {
      type: [Number, String],
      required: true,
    },

    isRequired: {
      type: Boolean,
      required: false,
      default: false,
    },

    label: {
      type: String,
      required: false,
      default: null,
    },

    placeholder: {
      type: String,
      required: true,
    },

    inputId: {
      type: String,
      required: true,
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
        <label class="d-inline-block m-b-4" v-if="label" :htmlFor="inputId">
            <span class="text-secondary-50">{{ label }}</span>
            <span v-if="isRequired" class="text-danger-100">*</span>
        </label>

        <input
            :id="inputId"
            class="w-100 radius-8 p-10 text-secondary-50 border-secondary-50"
            :type="type"
            :placeholder="placeholder"
            :value="value"
            @change="$emit('update:value', $event.target.value)"
        />
    </div>
</template>
<style scoped lang='sass'>
input
    height: 40px
    outline: none !important
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active
    outline: none !important
    box-shadow: none !important
    -webkit-box-shadow: 0 0 0 30px white inset !important
::placeholder
    font-family: primary-medium !important
    color: #F3D6DF !important
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
    -webkit-appearance: none
    margin: 0
input[type=number]
    -moz-appearance: textfield
</style>
