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
import CommonHeader from './components/commons/CommonHeader';
import CommonNavigator from './components/commons/CommonNavigator';
import {mapActions, mapMutations} from 'vuex';

export default {
  name: 'App',
  components: {
    CommonHeader,
    CommonNavigator
  },
  data () {
    return {
    }
  },
  created : function(){
  },
  methods : {
  }
}
</script>
