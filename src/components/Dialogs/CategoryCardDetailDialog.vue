<template>
 <v-card class="pa-5 rounded-xl" style="min-height: 700px;">
    <v-card-title class="text-h4 custom-underline">{{category.name}}</v-card-title>
    <v-card-text>
      <v-chip-group column class="mt-4">
        <v-chip
          v-for="subCategory in subCategories"
          :key="subCategory"
          class="me-3 rounded-lg pa-6"
          color="primary"
          size="large"
          variant="flat"
        >
          {{ subCategory }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>


<script setup>
import { ref, watch } from 'vue';


const props = defineProps({
  category: Object,
});


const subCategories = ref([]);

const populateSubCategory = () => {
  switch (props.category.name) {
    case 'Public Transit':
      subCategories.value = ['Delays', 'Crowding', 'Fare', 'Accessibility', 'Cleanliness'];
      break;
    case 'Parking':
      subCategories.value = ['Availability', 'Pricing', 'Illegal Parking', 'Special Parking Needs'];
      break;
    case 'Road Safety':
      subCategories.value = ['Street Lighting', 'Pedestrian Crossings', 'Traffic Signs', 'Accident Hotspots', 'Speeding Zones'];
      break;
    default:
      subCategories.value = [];
  }
};

watch(() => props.category, populateSubCategory, { immediate: true });



</script>


<style scoped>
.custom-underline {
  text-decoration: underline;
  text-decoration-color: #448AFF;
  text-decoration-thickness: 7px;
}
</style>
