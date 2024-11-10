<template>

  <AppBar class="h-5"/>

  <v-card class="bg-blue-accent-2 h-95 pa-5">
    <v-sheet class="bg-transparent pa-3">
      <v-row class="bg-white pa-3 rounded-lg">
        <v-col sm="6" md="6">
          <PieChartForCategoryCount :categories="categories" @segment-clicked="handleSegmentClick" />
        </v-col>
        <v-col sm="6" md="6">
          <Pie v-if="showSubChart" :data="subChartData" :options="subChartOptions" />
          <LineChartForMonthlyComplaintCount v-else :complaints="complaints" />
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
            class="mt-3 custom-data-table"
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
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import ComplaintCardDetailDialog from '@/components/Dialogs/ComplaintCardDetailDialog.vue';
import CategoryCardDetailDialog from '@/components/Dialogs/CategoryCardDetailDialog.vue';
import { getComplaintByCategory, getComplaints } from '@/services/complaint.servcie';
import PieChartForCategoryCount from '@/components/Charts/PieChartForCategoryCount.vue';
import AppBar from '@/components/AppBar.vue';
import LineChartForMonthlyComplaintCount from '@/components/Charts/LineChartForMonthlyComplaintCount.vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';


// Register the necessary components with Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const categories = ref([
  { name: 'Public Transit', count: 0, subCategories: {} },
  { name: 'Parking', count: 0, subCategories: {} },
  { name: 'Road Safety', count: 0, subCategories: {} },
]);

const timeFilter = ref([
  'Last 24 hours',
  'Last 7 days',
  'Last 30 days',
])

const selectedTimeFilter = ref(null);

const complaints = ref([])

const showSubChart = ref(false);
const subChartData = ref({});
const subChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: {
          size: 18,
        },
        padding: 20,
      },
    },
    title: {
      display: true,
      text: 'Subcategory Ratios',
      font: {
        size: 20,
      },
      padding: {
        top: 10,
        bottom: 30,
      },
    },
    datalabels: {
      formatter: (value, context) => {
        const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
        const percentage = (value / total * 100).toFixed(2) + '%';
        return percentage;
      },
      color: '#000',
      font: {
        size: 20,
        weight: 'bold', // Make the font bold
      },
    },
  },
});

const handleSegmentClick = (index) => {
  if(index === null){
    showSubChart.value = false;
    return;
  }
  console.log('Segment Clicked', index);
  const category = categories.value[index];
  if (category && category.subCategories) {
    const subCategoryCounts = Object.values(category.subCategories).map(count => count.length);
    console.log(subCategoryCounts);

    showSubChart.value = true;
    subChartData.value = {
      labels: Object.keys(category.subCategories),
      datasets: [
        {
          backgroundColor: ['#FF9843', '#86A7FC', '#FFDD95', '#4BC0C0', '#FF6384'],
          data: subCategoryCounts,
        },
      ],
    };
    console.log('Sub Chart Data', subChartData.value);
  }
};



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

  let filterComplaints = [];

  for(const complaint of complaints.value){
    // console.log('Complaint', complaint);
    const complaintTime = new Date(complaint.lastModifiedDate).getTime(); // Ensure complaintTime is in milliseconds
    const timeDifference = currentTime - complaintTime;
    console.log('complaintTime', complaintTime);
    console.log('Time Difference (ms)', timeDifference);

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
            // Group complaints by subCategory
            response.forEach(complaint => {
        if (!category.subCategories[complaint.subCategory]) {
          category.subCategories[complaint.subCategory] = [];
        }
        category.subCategories[complaint.subCategory].push(complaint);
      });
      category.count = response.length;
    }
    console.log(categories.value);
  }
  catch (error) {
    console.error(error);
  }
}


const getComplaintsData = async () => {
  try {
    const response = await getComplaints();
    complaints.value.push(...response)
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

const handleClickOutside = (event) => {
  const pieChartElement = document.querySelector('.pie-chart-container');
  if (pieChartElement && !pieChartElement.contains(event.target)) {
    showSubChart.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  getCategories();
  getComplaintsData();
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%; /* Adjust the width as needed */
  height: 400px; /* Adjust the height as needed */
}

.sub-chart-container {
  margin-top: 20px;
}

.custom-data-table .v-data-table__wrapper {
  font-size: 20px; /* Adjust the font size as needed */
}

.custom-data-table .v-data-table-header th {
  font-size: 18px; /* Adjust the font size for headers as needed */
}

.custom-data-table .v-data-table__wrapper td {
  font-size: 18px; /* Adjust the font size for table data as needed */
}
</style>
