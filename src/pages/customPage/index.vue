<template>
  <div>
    <wxParse :content="currentPage.content" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import wxParse from 'mpvue-wxparse'

export default {
  components: {
    wxParse
  },
  computed: {
    ...mapGetters({
      currentPage: 'customPage/current'
    })
  },
  mounted () {
     this.getCurrentPage({id: this.$route.query.id})
       .then(v => {
          wx.setNavigationBarTitle({
            title: v.name
          })
       });
  },
  methods: {
    ...mapActions({
      getCurrentPage: 'customPage/getCurrent'
    })
  }
}
</script>

<style>
</style>
