<script>
export default {
  components: {},
  props: {
    value: {
      type: Boolean,
      require: true,
    },
    name: {
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
    <label class="switch" :for="name + '_' + value">
        <input
            :name="name"
            :id="name + '_' + value"
            type="checkbox"
            :checked="value"
            @change="$emit('update-value', { value: $event.target.value })"
        />
        <span class="slider round"></span>
    </label>
</template>
<style scoped lang='sass'>
.switch
  position: relative
  display: inline-block
  width: 60px
  height: 30px
  & input
    opacity: 0
    width: 0
    height: 0
.slider
  position: absolute
  cursor: pointer
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-color: #ccc
  -webkit-transition: .4s
  transition: .4s

  &:before
    position: absolute
    content: ""
    height: 20px
    width: 20px
    left: 5px
    bottom: 5px
    background-color: white
    -webkit-transition: .4s
    transition: .4s

  input:checked + &
    background-color: #f06a00

  input:focus + &
    box-shadow: 0 0 1px #f06a00
  input:checked + &:before
    -webkit-transform: translateX(26px)
    -ms-transform: translateX(26px)
    transform: translateX(26px)
    left: 8px

  &.round
    border-radius: 34px

  &.round:before
    border-radius: 50%
</style>
