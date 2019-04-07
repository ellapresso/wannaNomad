<template>
  <div id="app">
    <!-- 자식컴포넌트의 'headerMsg' Prop은 부모컴포넌트인 App의 -->
    <!-- data의 Header에 바인딩된다. -->
    <CommonHeader v-bind:headerMsg="Header" v-on:childClicked="onChildClicked"></CommonHeader>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />

    <!-- 부모컴포넌트가 자식컴포넌트의 props data 정의 -->
    <CommonFooter footerMsg='Footer'></CommonFooter>
  </div>
</template>

<script>
import CommonHeader from "@/components/commons/CommonHeader.vue";
import CommonFooter from "@/components/commons/CommonFooter.vue";


export default {
  name : 'App',
  components : {
    CommonHeader,
    CommonFooter,
  },
  data : function() {
      return {
          Header : 'This is Header!',
          alertMsg : 'The App Component was created!',
      }
  },
  created : function() {
    // this는 해당 컴포넌트를 의미
    this.popAlert(this.alertMsg);
  },
  computed : {
    
  },
  methods : {
    popAlert : function(msg) {
      alert(msg);
    },
    onChildClicked : function(evt) {
      this.Header = 'child was clicked!';
    }
  }
}
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
