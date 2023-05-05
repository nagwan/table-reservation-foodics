<script>
export default {
  components: {},
  props: {
    inputValue: {
      type: [String, Number],
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },

    label: {
      type: String,
      required: false,
      default: null,
    },

    inputId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    selectedValues: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('update:value', val);
      },
    },
  },
  methods: {},
};
</script>
<template>
    <div class>
        <label :for="inputId" class="d-flex align-items-center cursor-pointer input-container">
            <input
                class="border-secondary-50 "
                type="checkbox"
                :id="inputId"
                :value="inputValue"
                v-model="selectedValues"
            />
            <span class="text-secondary-50 label-string">{{ label }}</span>
            <span class="checkmark"></span>
        </label>
    </div>
</template>
<style scoped lang='sass'>
.input-container
    position: relative
    .label-string
        position: relative
        left: 20px
        top: 0
    input
        position: absolute
        opacity: 0
        cursor: pointer
        height: 0
        width: 0
    .checkmark
        position: absolute
        top: 2px
        left: 0
        height: 15px
        width: 15px
        background-color: #eee
        border-radius: 2px
        display: flex
        align-items: center
        justify-content: center

        &:after
            content: ""
            position: absolute
            display: none
            // left: 5px
            // top: 5px
            width: 10px
            height: 10px
            border: 1px solid #EEC2CF
            border-radius: 2px
    input:checked ~ .checkmark
        background-color: #c73662
    input:checked ~ .checkmark:after
        display: block

</style>
