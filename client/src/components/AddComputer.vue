<template>
  <v-dialog v-model="dialog" max-width="600px" >
    <template v-slot:activator="{ on }" >
      Ajouter nouveau poste
      <v-btn
          class="mx-2"
          fab
          dark
          color="indigo"
          v-on="on"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>

    </template>
    <v-card>
      <v-card-title> Ajouter un ordinateur </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="name" color="success" label="Nom : " required />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="red" text @click="dialog = false">Annuler</v-btn>
        <v-btn outlined color="success" @click="addComputer" :disabled="!validate" class="mr-2">Ajouter</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script src="./addComputer.js"></script>
