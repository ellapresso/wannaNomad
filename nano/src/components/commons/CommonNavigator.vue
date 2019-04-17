<template>
  <!-- 양방향 바인딩이 필요없으므로, :value 속성만 사용 -->
  <v-navigation-drawer v-model="drawer" absolute clipped app>
    <v-list class="pa-1">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img
            src="https://phinf.pstatic.net/contact/20161019_275/1476810169283ETg3R_PNG/_MG_1148.png?type=s160"
          >
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>강승윤</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" router :to="item.goto" exact>
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>


export default {
  name: "CommonNavigator",
  /* Vuex를 사용한 상태관리를 시작하였으므로 필요없어지는 코드
    props : {
        passedDrawer : Boolean
    },
    */
  data() {
    return {
      
    };
  },
  methods: {
    blabla() {
      // blablabla...
    },
    goToLink(item) {
      //this.$store.commit('setTitle', item.title);

      debugger;

      if(item.goto && item.goto === '/logout') {
        this.$store.state.firebase.auth().signOut().then((res) => {
          // Sign-out successful.
          alert('로그아웃에 성공하였습니다.');

          this.$store.commit('setLoginStatus', false);
          this.$router.push({ path: '/' });
        }).catch(function(error) {
          // An error happened.
          console.log(error);
          alert('로그아웃에 실패하였습니다.');
        });
      }else {
        this.$router.push({ path: item.goto });
      }

    }
  },
  computed: {
    drawer: {
      get: function() {
        return this.$store.getters.getDrawer;
      },
      // 양방향 바인딩(v-model)시, getter외에도 setter가 호출된다.
      // 변경된 값이 value로 들어온다.
      set: function(value) {
        // 전역 상태관리값에 대입
        this.$store.state.drawer = value;
      }
    },
    // 양방향 바인딩시에는 setter 도 필요하다.
    items: {
        get: function() {
          return this.$store.state.titles;
        }
    },
  }
};
</script>

<style>
</style>
