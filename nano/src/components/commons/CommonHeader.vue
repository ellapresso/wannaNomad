<template>
  <!-- 자식컴포넌트인 CommonHeader가 부모컴포넌트 App의 데이터를 바꾸려면, -->
  <!-- 이벤트 버스를 통해 데이터를 변경하여야 한다. -->
  <!--<div id="common-header" v-on:click="clickMe">{{headerMsg}}</div>-->
    <v-toolbar
      absolute
      color="gray lighten-3"
      dark
      scroll-off-screen
      scroll-target="#scrolling-techniques"
      app
    >
      <v-toolbar-side-icon @click="changeDrawer();"></v-toolbar-side-icon>
      <v-toolbar-title>NANO</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    
</template>

<script>

export default {
  name: "CommonHeader",
  // 자식컴포넌트는, props를 정의함으로써
  // 부모컴포넌트가 자식컴포넌트 데이터를 변경할 수 있도록 한다.
  props: {
    headerMsg: String,
    content: String
  },
  components : {
  },
  methods: {
    clickMe: () => {
      this.$emit("childClicked");
    },
    changeDrawer : function(){
        this.$store.commit('setDrawer');
    },
  },
  created: function() {
  },
  computed : {
    title : {
        get() {
            return this.$store.getters.getTitle;
        }
    }
  },
  data() {
        return {};
    }
};
</script>

<style>
</style>
