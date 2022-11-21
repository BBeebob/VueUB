<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item title="John Leider"></v-list-item>

        <v-divider></v-divider>

        <v-list nav>
          <v-list-item
            prepend-icon="mdi-home"
            style="text"
            title="Home"
            value="home"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-home"
            title="About"
            value="about"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-chat"
            title="About"
            value="about"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 100vh">
        <div class="d-flex justify-center align-center h-100">
          <v-btn color="primary" @click.stop="drawer = !drawer"> Toggle </v-btn>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
    };
  },
};
</script>
