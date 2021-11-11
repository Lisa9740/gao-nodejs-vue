<template>
  <div style="min-height: 80vh !important;" class="d-flex flex-column justify-content-center align-items-center">
    <div class="card p-5 py-15 w-50 mx-auto shadow">
      <h5 class="text-center">Se connecter </h5>
      <v-form ref="form" v-model="valid" lazy-validation >
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Adresse e-mail"
            required
            type="email"
        ></v-text-field>

        <v-text-field
            v-model="password"
            :rules="passwordRule"
            label="Mot de passe"
            required
            type="password"
        ></v-text-field>

        <div class="d-flex justify-center text-white">
          <v-btn :disabled="!valid" color="#3f51b5" class=" login-btn text-center text-white" @click="validate" >
            Connexion
          </v-btn>
        </div>
      </v-form>
    </div>
  </div>
</template>
<style>
.login-btn{
  color: white !important;
}
</style>
<script src="./login.js"></script>
