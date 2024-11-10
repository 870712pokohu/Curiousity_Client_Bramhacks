<template>
  <v-container>
    <v-form>
      <v-card class="mb-6" elevation="2">
        <v-card-title>
          <span class="headline">Customer Survey</span>
        </v-card-title>
        <v-card-text>
          <v-subheader>Please rate your satisfaction with us</v-subheader>
          <div class="my-4">
            <v-row>
              <v-col cols="12">
                <v-subheader><span style="font-weight: bold; font-size: 18px;">1. How would you rate the ease of parking in your area? (1-5 scale)</span></v-subheader>
                <v-row class="d-flex align-center justify-space-between">
                  <v-col cols="auto" v-for="n in 5" :key="n">
                    <v-checkbox
                      :value="false"
                      :label="n"
                      style="margin-right: 8px; margin-left: 8px;"
                      color="#546E7A"
                      hide-details
                      on-icon="$mdiCheckboxBlankCircle"
                      off-icon="$mdiCheckboxBlankCircleOutline"
                    ></v-checkbox>

                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-subheader>
                  <span style="font-weight: bold; font-size: 18px;">2. Where do you experience the most traffic congestion?</span>
                </v-subheader>
                <v-text-field
                  label="Enter location"
                  outlined
                  dense
                  placeholder="Type here..."
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-subheader><span style="font-weight: bold; font-size: 18px;">3. Where do you experience the most traffic congestion?</span></v-subheader>
                <v-col cols="12" class="px-1"> <!-- Reduced horizontal padding -->
                  <v-checkbox color="#546E7A" label="New parking spaces" value="newParkingSpaces"></v-checkbox>
                </v-col>
                <v-col cols="12" class="px-1">
                  <v-checkbox color="#546E7A" label="Improved traffic signals" value="improvedTrafficSignals"></v-checkbox>
                </v-col>
                <v-col cols="12" class="px-1">
                  <v-checkbox color="#546E7A" label="Enhanced public transport options" value="enhancedPublicTransport"></v-checkbox>
                </v-col>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="submitSurvey">Submit</v-btn>
        </v-card-actions>

      </v-card>
    </v-form>
  </v-container>
</template>


<script setup>

const props = defineProps({
  survey: Object,
});

// console.log('survey', props.complaint);

</script>

<style>
  .custom-checkbox-spacing {
  margin-right: 8px;
  margin-left: 8px;
}
</style>