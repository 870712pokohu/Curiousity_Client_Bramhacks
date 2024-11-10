<template>
  <v-card class="rounded-lg mx-auto elevation-3" style="min-width: 200px; min-height: 200px">
    <v-img
      height="250px"
      :src="currentImage"
      cover
    ></v-img>
    <div class="pa-3 d-flex flex-lg-row flex-md-column flex-sm-column align-center justify-space-between">
      <v-card-title class="text-h5">{{category.name}}</v-card-title>
      <v-card-subtitle class="text-h6" >Complaints: {{category.count}}</v-card-subtitle>
    </div>
  </v-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import publicTransitImage from './../assets/public_transit.png';
import parkingImage from './../assets/parking.png';
import roadSafetyImage from './../assets/road_safety.png';


const props = defineProps({
  category: Object,
});

// console.log(props.category);

const currentImage = ref('');

const subCategories = ref([]);

const populateSubCategory = () => {
  switch (props.category.name) {
    case 'Public Transit':
      currentImage.value = publicTransitImage;
      subCategories.value = ['Delays', 'Crowding', 'Fare', 'Accessibility', 'Cleanliness'];
      break;
    case 'Parking':
      currentImage.value = parkingImage;
      subCategories.value = ['Availability', 'Pricing', 'Illegal Parking', 'Special Parking Needs'];
      break;
    case 'Road Safety':
      currentImage.value = roadSafetyImage;
      subCategories.value = ['Street Lighting', 'Pedestrian Crossings', 'Traffic Signs', 'Accident Hotspots', 'Speeding Zones'];
      break;
    default:
      subCategories.value = [];
  }
};

watch(() => props.category, populateSubCategory, { immediate: true });


</script>
