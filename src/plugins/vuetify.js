/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#DB0031",
          secondary: "#5CBBF6",
          quote: "#00A1E0",
          project: "#549143",
          quoteLight: "#6DBEDB",
          projectLight: "#A1BF99",
          task: "#DB0031",
          taskLight: "#D3B3BB",
          background: "#E0E0E0",
        },
      },
    },
  },
});
