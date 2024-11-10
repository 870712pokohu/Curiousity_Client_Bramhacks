<template>
   <v-app>
    <NavBar/>
    <v-main>
      <v-container class="chat-container pa-3" >
        <v-form class="survey_form">
        <v-card class="px-4 py-3">
          <v-img
              :src="LogoImage "  
              height="50"
              aspect-ratio="1.5"  
              class="ml-auto"  
            ></v-img>

          <v-card-title>
            <span class="headline">Customer Survey</span>
          </v-card-title>
          <v-card-text>

            <v-row>
              <!-- Position link on its own line -->
              <v-col cols="12">
                <!-- <v-btn text :href="positionLink"
                @click="showDetails(true, 'survey')" 
                color="amber-lighten-4" block>Survey 6</v-btn> -->
                <div
                  v-for="(survey, index) in surveys"
                  :key="index"
                  class="mt-3 ms-5"
                >
                  <SurveyCard
                    @click="showDetails(true, 'survey', survey)"
                    :survey="survey"
                  />
                </div>
                
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-form>
      </v-container>
      <v-dialog
        v-model="showDetailsDialog"
        max-width="1000px"
        @keydown.esc="showDetails(false)"
        @blur="showDetails(false)"
      >
        <div v-if="isSurvey">
          <SurveyCardDetailDialog :survey="currentSurvey" />
        </div>
        
      </v-dialog>
    </v-main>
   </v-app>
</template>

<script setup>
import { ref } from 'vue';
import SurveyCard from '../components/SurveyCard.vue'
import SurveyCardDetailDialog from '@/components/Dailogs/SurveyCardDetailDialog.vue';
import NavBar from '@/components/NavBar.vue';
import LogoImage from '../assets/Logo.jpeg';

const showDetailsDialog = ref(false);
const isSurvey = ref(false);
const currentSurvey = ref(null);
const dialogType = ref('');
console.log('im here')
const submitForm = async() => {
      // You can add form submission logic here
      alert('Form submitted!');
    }
  
const surveys = ref([
  {
    name: 'Survey 1',
  }
  ,
  {
    name: 'Survey 2',
  }
  ,
  {
    name: 'Survey 3',
  },
  {
    name: 'Survey 4',
  },
  {
    name: 'Survey 5',
  }
]);

const showDetails = (value, type, data) => {
  showDetailsDialog.value = value;
  if (value === false){
    isSurvey.value = false;
    currentSurvey.value = null;
    return;
  }
  else{
    switch (type){
      case 'survey':
        isSurvey.value = true;
        currentSurvey.value = data;
        break;

    }
  }
}
</script>

<style>
.headline {
  font-size: 24px;
  font-weight: bold;
}

</style>
