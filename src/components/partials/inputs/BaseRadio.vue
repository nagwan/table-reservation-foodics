<script>
export default {
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {
    isChecked() {
      return this.selected === this.value;
    },
  },

  methods: {},
};
</script>

<template>
    <div class="radio-input-container">
         <label
            :htmlFor="name + '_' + value"
            class=""
            :for="name + '_' + value"
        >
        <input
            :id="name + '_' + value"
            type="radio"
            :value="value"
            :checked="isChecked"
            :name="name + ` radio-input-` + value"
            @change="$emit('update-value', { value: $event.target.value })"
        />
        <div class="text-center border-primary-50 p-10 radius-8 cursor-pointer text-primary-regular">

            <span class="m-l-6">{{ label }}</span>
        </div>
        </label>
    </div>
</template>

<style scoped lang='sass'>
.radio-input-container
    input[type="radio"]
        opacity: 0
        display: none
    label
        height: 38px !important
        min-width: 70px
        width: max-content
    input[type="radio"]:checked + div
        background: #f06a00
        color: #fff !important
</style>
