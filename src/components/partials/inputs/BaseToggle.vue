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
    <label class="switch" :for="name">
        <input
            :name="name"
            :id="name"
            type="checkbox"
            :checked="value"
            @change="$emit('update-value', { value: $event.target.value })"
        />
        <span class="slider round" :class="{ checked: value }"></span>
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
  &.round
    border-radius: 34px
  &.round:before
    border-radius: 50%
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
.checked
  background-color: #f06a00
.checked
  &:before
    -webkit-transform: translateX(26px)
    -ms-transform: translateX(26px)
    transform: translateX(26px)
    left: 8px
</style>
