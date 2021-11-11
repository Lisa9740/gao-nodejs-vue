<template>
  <v-app>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet" />

    <!-- subheader -->
    <div>
      <v-toolbar app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">
            GAO
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-if="this.isLogged" icon color="black" @click="disconnected">
            <v-icon>mdi-export</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>

    <!-- main with router view that import to handle routes -->
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- flash message component -->
    <flashMessage></flashMessage>
  </v-app>
</template>

<script src='./layout.js'></script>
