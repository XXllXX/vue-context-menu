<template>
  <li
    :class="isEmpty? 'menu-item menu-item-space':'seperator'"
    :aria-label="label"
    tabindex="1"
    @click="menuClick"
  >
    <slot>{{label}}</slot>
  </li>
</template>
<script>
export default {
  name: 'context-menu-item',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    isEmpty: function() {
      if (this.label || this.$slots.default) return true
      return false
    }
  },
  created() {},
  methods: {
    menuClick() {
      if (this.label) this.$emit('click')
    }
  }
}
</script>