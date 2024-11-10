<template>
  <div class="chart-container">
    
    <!-- <Line :data="chartData" :options="chartOptions" /> -->
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

const props = defineProps({
  complaints: Array, // Array of objects with month and count properties
});

// const chartData = computed(() => {
//   return {

//   };
// });

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly Complaint Count',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Month',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Count',
      },
      beginAtZero: true,
    },
  },
};

</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 400px; /* Adjust the height as needed */
}
</style>
