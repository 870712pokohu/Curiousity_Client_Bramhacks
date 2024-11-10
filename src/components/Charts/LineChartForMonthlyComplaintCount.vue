<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

const props = defineProps({
  complaints: Array, // Array of complaint objects
});

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const groupedComplaints = computed(() => {
  const counts = Array(12).fill(0); // Initialize an array with 12 zeros

  props.complaints.forEach(complaint => {
    const month = new Date(complaint.lastModifiedDate).getMonth(); // Get the month (0-11)
    counts[month]++;
  });

  return counts;
});

const chartData = computed(() => {
  return {
    labels: months,
    datasets: [
      {
        label: 'Monthly Complaint Count',
        backgroundColor: '#42A5F5',
        borderColor: '#42A5F5',
        data: groupedComplaints.value,
        fill: false,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
          font: {
            size: 18,
          },
          padding: 20,
        },
    },
    title: {
      display: true,
      text: 'Complaints by Year (2024)',
      font: {
        size: 20,
      },
      padding: {
        top: 10,
        bottom: 30,
      },
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
