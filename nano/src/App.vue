<template>
  <v-app>
    <CommonNavigator></CommonNavigator>
    <CommonHeader></CommonHeader>
    <v-content>
      <v-container ref="container" fill-height>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import CommonHeader from './components/commons/CommonHeader'
import CommonNavigator from './components/commons/CommonNavigator'

export default {
  name: 'App',
  components: {
    CommonHeader,
    CommonNavigator
  },
  data () {
    return {
      //
    }
  },
  created : function(){
      this.$store.commit('setRouter', this.$router);
      this.$store.dispatch('checkUsersLogin');
  }
}
</script>
