<template>
 <v-card class="pa-5 rounded-xl" style="min-height: 700px;">
    <v-card-title class="text-h4 custom-underline">{{category.name}}</v-card-title>
    <v-card-text>
      <v-chip-group column class="mt-4">
        <v-chip
          v-for="subCategory in subCategories"
          :key="subCategory"
          @click="handleChipClick(subCategory)"
          class="me-3 rounded-lg pa-6"
          color="primary"
          size="large"
          variant="flat"
        >
          {{ subCategory }}
        </v-chip>
      </v-chip-group>
      <v-data-table
        v-if="filteredData.length > 0"
        :items-per-page="5"
        :items="filteredData"
        class="mt-3"
      />
    </v-card-text>
  </v-card>
</template>


<script setup>
import { ref, watch } from 'vue';


const props = defineProps({
  category: Object,
});

console.log(props.category);

const headers = [
  { text: 'Id', value: 'complaintId' },
  { text: 'Complaint', value: 'complaintDescription' },
  { text: 'Category', value: 'category' },
  { text: 'Updated Date', value: 'lastModifiedDate' },
];

const selectedSubCategory = ref(null);
const subCategories = ref([]);
const filteredData = ref([]);

const populateSubCategory = () => {
  const subCategoryCounts = {};

  // Calculate the count for each subCategory
  for (const subCategory in props.category.subCategories) {
    subCategoryCounts[subCategory] = props.category.subCategories[subCategory].length;
  }

  // Sort subcategories by count in descending order
  const sortedSubCategories = Object.keys(subCategoryCounts).sort((a, b) => {
    return subCategoryCounts[b] - subCategoryCounts[a];
  });

  // Populate the subCategories array with the name and count
  subCategories.value = sortedSubCategories.map(subCategory => {
    return `${subCategory} (${subCategoryCounts[subCategory]})`;
  });
};

const filterDataBySubCategory = () => {
  console.log(selectedSubCategory.value);

  if (selectedSubCategory.value) {
    const subCategoryName = selectedSubCategory.value.split(' (')[0];
    filteredData.value = props.category.subCategories[subCategoryName] || [];
  } else {
    // Show all data if no chip is selected
    filteredData.value = Object.values(props.category.subCategories).flat();
  }
};

const handleChipClick = (subCategory) => {
  if (selectedSubCategory.value === subCategory) {
    selectedSubCategory.value = null;
  } else {
    selectedSubCategory.value = subCategory;
  }
};


watch(() => props.category, populateSubCategory, { immediate: true });
watch(selectedSubCategory, filterDataBySubCategory, { immediate: true });

</script>


<style scoped>
.custom-underline {
  text-decoration: underline;
  text-decoration-color: #448AFF;
  text-decoration-thickness: 10px;
}
</style>
