<template>
  <v-card class="bg-background h-100 pa-5">
    <div class="pa-5">
      <div class="text-h4">Time Range</div>
      <v-chip-group
        class="mt-3"
        selected-class="text-primary"
        v-model="selectedTimeFilter"
        @update:modelValue="onTimeFilterUpdate"
        >
        <v-chip
          density="comfortable"
          size="large"
          class="pa-6"
          v-for="(time, index) in timeFiter"
          :key="index"
          @click="selectedTimeFilter = time"
          filter
        >
          {{ time }}
        </v-chip>
      </v-chip-group>
    </div>
    <!-- Top Complaint -->
    <v-sheet class="bg-transparent pa-5">
       <h3 class="text-h3">Top Complaints</h3>
        <div class="mt-5 d-flex flex-row flex-wrap">
          <div
            v-for="(complaint, index) in complaints.slice(0, 4)"
            :key="index"
            class="mt-3 ms-5"
          >
            <ComplaintCard
              @click="showDetails(true, 'complaint', complaint)"
              :complaint="complaint"
            />
          </div>
        </div>
    </v-sheet>
    <v-sheet class="bg-transparent pa-5 mt-5">
      <h3 class="text-h3">Categories</h3>
      <div class="mt-5 d-flex flex-row flex-wrap">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="mt-3 ms-5"
        >
          <!-- Categories -->
          <CategoryCard
            @click="showDetails(true, 'category', category)"
            :category="category"
          />
        </div>
      </div>
    </v-sheet>
    <v-sheet class="bg-transparent pa-5 mt-5">
      <h3 class="text-h3">Complaints</h3>
      <v-card class="ms-5 mt-5 pa-5">
        <v-card-text>

          <v-data-table
            :items="filteredComplaints"
            :items-per-page="5"
            class="mt-3"
          >
          </v-data-table>
        </v-card-text>
      </v-card>
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

import ComplaintCard from '../components/ComplaintCard.vue'
import CategoryCard from '../components/CategoryCard.vue'
import { ref, watch } from 'vue';
import ComplaintCardDetailDialog from '@/components/Dailogs/ComplaintCardDetailDialog.vue';
import CategoryCardDetailDialog from '@/components/Dailogs/CategoryCardDetailDialog.vue';

const categories = ref([
  {
    name: 'Public Transit',
    
    count: 10,
  }
  ,
  {
    name: 'Parking',
    count: 20,
  }
  ,
  {
    name: 'Road Safety',
    count: 30,
  }
]);

const timeFiter = ref([
  'Last 24 hours',
  'Last 7 days',
  'Last 30 days',
])

const selectedTimeFilter = ref(null);


const complaints = ref([
  {
    title: 'Complaint 1',
    description: 'Description 1',
    category: 'Category 1',
    status: 'Pending',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    title: 'Complaint 2',
    description: 'Description 2',
    category: 'Category 2',
    status: 'Pending',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    title: 'Complaint 3',
    description: 'Description 3',
    category: 'Category 3',
    status: 'Pending',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  },
  {
    title: 'Complaint 4',
    description: 'Description 4',
    category: 'Category 4',
    status: 'Pending',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
  },
  {
    title: 'Complaint 5',
    description: 'Description 5',
    category: 'Category 1',
    status: 'Resolved',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },
  {
    title: 'Complaint 6',
    description: 'Description 6',
    category: 'Category 2',
    status: 'Resolved',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
  },
  {
    title: 'Complaint 7',
    description: 'Description 7',
    category: 'Category 3',
    status: 'Resolved',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    title: 'Complaint 8',
    description: 'Description 8',
    category: 'Category 4',
    status: 'Resolved',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
  },
  {
    title: 'Complaint 9',
    description: 'Description 9',
    category: 'Category 1',
    status: 'Pending',
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days ago
  },
  {
    title: 'Complaint 10',
    description: 'Description 10',
    category: 'Category 2',
    status: 'Pending',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
]);


const calculateTimeRange = () => {
  if (selectedTimeFilter.value === null) {
    return complaints.value;
  }
  const timeFilter = selectedTimeFilter.value;
  const currentTime = new Date();
  return complaints.value.filter(complaint => {
    const complaintTime = new Date(complaint.timestamp);
    switch (timeFilter) {
      case 'Last 24 hours':
        return (
          currentTime - complaintTime <= 24 * 60 * 60 * 1000
        );
      case 'Last 7 days':
        return (
          currentTime - complaintTime <= 7 * 24 * 60 * 60 * 1000
        );
      case 'Last 30 days':
        return (
          currentTime - complaintTime <= 30 * 24 * 60 * 60 * 1000
        );
      default:
        return true;
    }
  });
};

watch(selectedTimeFilter, () => {
  filteredComplaints.value = calculateTimeRange();
});

const filteredComplaints = ref(calculateTimeRange());
const showDetailsDialog = ref(false);
const currentComplaint = ref(null);
const currentCategory = ref(null);
const isTopComplaint = ref(false);
const isCategory = ref(false);


const onTimeFilterUpdate = (value) => {
  selectedTimeFilter.value = value;
  filteredComplaints.value = calculateTimeRange();
  console.log(filteredComplaints.value);
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
