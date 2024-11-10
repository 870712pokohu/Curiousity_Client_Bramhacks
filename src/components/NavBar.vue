<template>
  <v-navigation-drawer width="244">

      <!-- <v-sheet
        color="grey-lighten-5"
        height="128"
        width="100%"
      >
        <v-avatar
        class="d-block text-center mx-auto mt-4"
        color="grey-darken-1"
        size="70"
        >
        </v-avatar>
      </v-sheet> -->

      <v-sheet color="grey-lighten-3" height="128" width="100%">
        <v-container class="d-flex flex-column align-center justify-center" fill-height>
          <v-avatar class="mt-4" color="grey-darken-1" size="70">
            <v-img
              alt="User"
              :src="userImage"
            ></v-img>
          </v-avatar>
          <span class="text-center subtitle-1">BramHacks User</span>
        </v-container>
      </v-sheet>

      <v-list class="pa-3 mt-3">
        <v-list-item
          title="Home"
          link
          @click="goToHomePage()"
          class="d-flex justify-center align-center"
          style="background-color: #E0E0E0;height: 50px; margin-bottom: 10px;"
        ></v-list-item>
        <v-list-item
          title="Survey"
          link
          @click="goToSurvey()"
          class="d-flex justify-center align-center"
          style="background-color: #E0E0E0;
           height: 50px; margin-bottom: 10px;"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>


<script setup>

const router = useRouter();

import { useRouter } from 'vue-router';
import userImage from '../assets/User.jpeg'

const goToSurvey = () => {
  router.push({ name: 'Survey' });
};

const goToHomePage = () => {
  router.push({ name: 'UserPage' });
};

</script>