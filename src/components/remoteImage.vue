<template>
  <image :src="trueSrc" :mode="mode" :class="className" @click="handleClick" />
</template>

<script>
import config from '@/plugins/http/flyio/config'

export default {
    computed: {
        trueSrc() {
           return this.src ? config.host + '/' + this.src : null
        }
    },
    props: ['src', 'className', 'mode'],
    methods: {
      handleClick: function () {
         this.$emit('click');
      }
    }
}
</script>

<style>
</style>
