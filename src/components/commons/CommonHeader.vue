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
      <v-snackbar
        v-model="snackbarConfig.snackbar"
        :bottom="snackbarConfig.y === 'bottom'"
        :left="snackbarConfig.x === 'left'"
        :multi-line="snackbarConfig.mode === 'multi-line'"
        :right="snackbarConfig.x === 'right'"
        :timeout="snackbarConfig.timeout"
        :top="snackbarConfig.y === 'top'"
        :vertical="snackbarConfig.mode === 'vertical'"
      >
          {{ snackbarConfig.text }}
          <v-btn color="pink" flat @click="snackbar = false">닫기</v-btn>
      </v-snackbar>

      <v-toolbar-side-icon @click="setDrawer(true)"></v-toolbar-side-icon>
      <v-toolbar-title>NANO</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-badge  overlap color="orange">
          <template v-slot:badge>
            <v-icon>notifications</v-icon>
          </template>
          <v-icon>mail</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('ui');

export default {
  name: "CommonHeader",
  // 자식컴포넌트는, props를 정의함으로써
  // 부모컴포넌트가 자식컴포넌트 데이터를 변경할 수 있도록 한다.
  methods: {
    ...mapActions(['setDrawer']),
  },
  computed : {
    ...mapGetters({
        title : 'getTitles',
        snackbarConfig : 'getsnackbarConfig'
    }),
  },
};
</script>

<style>
</style>
