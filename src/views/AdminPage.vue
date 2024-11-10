<template>

  <AppBar class="h-5"/>

  <v-card class="bg-blue-accent-2 h-95 pa-5">
    <v-sheet class="bg-transparent pa-3">
       <v-row class="bg-white pa-5 rounded-lg">
        <v-col sm="6" md="4">
          <PieChartForCategoryCount :categories="categories" />
        </v-col>
        <v-col sm="6" md="4">
          <LineChartForMonthlyComplaintCount :complaints="complaints"/>
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet class="bg-white pa-3 mt-10 rounded-lg">
      <v-chip-group
        class="mt-3 rounded-lg pa-3"
        selected-class="text-primary"
        v-model="selectedTimeFilter"
        @update:modelValue="onTimeFilterUpdate"
        >
        <v-chip
          density="comfortable"
          size="large"
          class="pa-6"
          v-for="(time, index) in timeFilter"
          :key="index"
          @click="selectedTimeFilter = time"
          label
          filter
        >
          {{ time }}
        </v-chip>
      </v-chip-group>
      <v-sheet class="bg-transparent pa-4 mt-3">
        <h3 class="text-h3">Categories</h3>
        <v-row class="mt-1">
          <v-col
            v-for="(category, index) in categories"
            :key="index"
            cols="12" sm="6" md="4"
            class="mt-3"
          >
            <CategoryCard
              @click="showDetails(true, 'category', category)"
              :category="category"
            />
          </v-col>
        </v-row>
      </v-sheet>
      <v-sheet class="bg-transparent pa-4 mt-5">
        <h3 class="text-h3">Complaints</h3>
        <v-card class="mt-5 pa-3 elevation-3">
          <v-data-table
            :items="filteredComplaints"
            :items-per-page="5"
            :no-data-text="`No complaints found for the ${timeFilter[selectedTimeFilter]}`"
            >
          </v-data-table>
        </v-card>
      </v-sheet>
    </v-sheet>
  </v-card>

  <v-dialog
    v-model="showDetailsDialog"
    max-width="1000"
    @keydown.esc="showDetails(false)"
    @blur="showDetails(false)"
  >
    <div v-if="isTopComplaint">
      <ComplaintCardDetailDialog :complaint="currentComplaint" />
    </div>
    <div v-if="isCategory">
      <CategoryCardDetailDialog :category="currentCategory" />
    </div>
  </v-dialog>
</template>

<script setup>

import CategoryCard from '../components/CategoryCard.vue'
import { ref, watch } from 'vue';
import ComplaintCardDetailDialog from '@/components/Dialogs/ComplaintCardDetailDialog.vue';
import CategoryCardDetailDialog from '@/components/Dialogs/CategoryCardDetailDialog.vue';
import { getComplaintByCategory } from '@/services/complaint.servcie';
import PieChartForCategoryCount from '@/components/Charts/PieChartForCategoryCount.vue';
import AppBar from '@/components/AppBar.vue';
import LineChartForMonthlyComplaintCount from '@/components/Charts/LineChartForMonthlyComplaintCount.vue';

const categories = ref([
  {
    name: 'Public Transit',
    count: 10
  }
  ,
  {
    name: 'Parking',
    count: 20
  }
  ,
  {
    name: 'Road Safety',
    count: 30
  }
]);

const timeFilter = ref([
  'Last 24 hours',
  'Last 7 days',
  'Last 30 days',
])

const selectedTimeFilter = ref(null);


const complaints = ref([
  {
    id: 1,
    description: 'Delays in public transit services.',
    category: 'Public Transit',
    subCategory: 'Delays',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: 2,
    description: 'Crowding issues in public transit.',
    category: 'Public Transit',
    subCategory: 'Crowding',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: 3,
    description: 'Fare discrepancies in public transit.',
    category: 'Public Transit',
    subCategory: 'Fare',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    id: 4,
    description: 'Accessibility issues in public transit.',
    category: 'Public Transit',
    subCategory: 'Accessibility',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
  },
  {
    id: 5,
    description: 'Cleanliness concerns in public transit.',
    category: 'Public Transit',
    subCategory: 'Cleanliness',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    id: 6,
    description: 'Parking availability issues.',
    category: 'Parking',
    subCategory: 'Availability',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
  },
  {
    id: 7,
    description: 'High pricing for parking.',
    category: 'Parking',
    subCategory: 'Pricing',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    id: 8,
    description: 'Illegal parking issues.',
    category: 'Parking',
    subCategory: 'Illegal Parking',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
  },
  {
    id: 9,
    description: 'Special parking needs not met.',
    category: 'Parking',
    subCategory: 'Special Parking Needs',
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
  },
  {
    id: 10,
    description: 'Poor street lighting.',
    category: 'Road Safety',
    subCategory: 'Street Lighting',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    id: 11,
    description: 'Issues with pedestrian crossings.',
    category: 'Road Safety',
    subCategory: 'Pedestrian Crossings',
    timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(), // 11 days ago
  },
  {
    id: 12,
    description: 'Traffic signs are not visible.',
    category: 'Road Safety',
    subCategory: 'Traffic Signs',
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
  },
  {
    id: 13,
    description: 'Accident hotspots not addressed.',
    category: 'Road Safety',
    subCategory: 'Accident Hotspots',
    timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(), // 13 days ago
  },
  {
    id: 14,
    description: 'Speeding zones not monitored.',
    category: 'Road Safety',
    subCategory: 'Speeding Zones',
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
  },
]);


const calculateTimeRange = () => {
  if (selectedTimeFilter.value === null) {
    return complaints.value;
  }

  // console.log('Selected Time Filter', selectedTimeFilter.value);

  // Define time ranges in milliseconds
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const SEVEN_DAYS = 7 * ONE_DAY;
  const THIRTY_DAYS = 30 * ONE_DAY;

  const timeFilter = selectedTimeFilter.value;
  const currentTime = Date.now(); // Get current time in milliseconds
  // console.log('currentTime', new Date(currentTime));

  let filterComplaints = [];

  for(const complaint of complaints.value){
    const complaintTime = new Date(complaint.timestamp).getTime(); // Ensure complaintTime is in milliseconds
    const timeDifference = currentTime - complaintTime;
    // console.log('complaintTime', new Date(complaintTime));
    // console.log('Time Difference (ms)', timeDifference);

    switch (timeFilter) {
      case 0:
        if (timeDifference <= ONE_DAY) {
          filterComplaints.push(complaint);
        }
        break;
      case 1:
        if (timeDifference <= SEVEN_DAYS) {
          filterComplaints.push(complaint);
        }
        break;
      case 2:
        if (timeDifference <= THIRTY_DAYS) {
          filterComplaints.push(complaint);
        }
        break;
      default:
        filterComplaints.push(complaint); // No filter applied if the timeFilter is unrecognized
    }
  }

  // console.log('Filtered Complaints', filterComplaints);

  return filterComplaints

};


watch(selectedTimeFilter, () => {
  console.log(calculateTimeRange())
  filteredComplaints.value = calculateTimeRange();
  // console.log(filteredComplaints.value);
});

const filteredComplaints = ref(calculateTimeRange());
const showDetailsDialog = ref(false);
const currentComplaint = ref(null);
const currentCategory = ref(null);
const isTopComplaint = ref(false);
const isCategory = ref(false);

const getCategories = async () => {
  try {
    for(const category of categories.value){
      const response = await getComplaintByCategory(category.name);
      category.count = response.data.length;
    }
  }
  catch (error) {
    console.error(error);
  }
}

const getComplaints = async () => {
  try {
    const response = await getComplaints();
    complaints.value = response.data;
  }
  catch (error) {
    console.error(error);
  }
}

const onTimeFilterUpdate = (value) => {
  selectedTimeFilter.value = value;
}

const showDetails = (value, type, data) => {
  showDetailsDialog.value = value;
  if (value === false){
    isTopComplaint.value = false;
    isCategory.value = false;
    currentComplaint.value = null;
    currentCategory.value = null;
    return;
  }
  else{
    switch (type){
      case 'complaint':
        isTopComplaint.value = true;
        isCategory.value = false;
        currentComplaint.value = data;
        break;
      case 'category':
        isTopComplaint.value = false;
        isCategory.value = true;
        currentCategory.value = data;
        break;
    }
  }
}

</script>
