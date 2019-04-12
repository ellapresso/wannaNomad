<template>
    <v-jumbotron color="primary" dark>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>
          <h3 class="display-3">Wanna Nomad?</h3>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
export default {
    name : 'Home',
    created() {
        this.$store.dispatch('checkUsersLogin', this.$router);
    },
}
</script>

<style>

</style>
