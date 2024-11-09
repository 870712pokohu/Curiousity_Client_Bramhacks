<template>
  <survey :survey="survey" />
</template>

<script>
import * as Survey from "survey-vue";
import axios from "axios";

import "survey-vue/modern.css";
import "./index.css";

Survey.StylesManager.applyTheme("modern");

export default {
  name: "surveyjs-component",
  data() {
    const json = {
      title: "Anchor Telecoms Customer Survey",
      description: "Please rate your satisfication with us",
      logo:
        "http://anchortelecoms.com/wp-content/uploads/2019/02/Anchor-Telecoms_Logo-1-e1551353509444.png",
      logoFit: "contain",
      logoHeight: 76,
      logoWidth: 80,
      width: "100px",
      pages: [
        {
          name: "page1",
          navigationTitle: "Customer",
          navigationDescription: "Customer's info",
          elements: [
            {
              type: "panel",
              name: "first_page_container_panel",
              elements: [
                {
                  type: "panel",
                  name: "data_collector_information",
                  elements: [
                    {
                      type: "text",
                      name: "company_name",
                      title: "Company Name",
                      isRequired: true,
                    },
                    {
                      type: "text",
                      name: "contact_name",
                      title: "Name of Contact",
                      isRequired: true,
                    },
                    {
                      type: "text",
                      name: "position",
                      title: "Position",
                      inputType: "text",
                      isRequired: true,
                    },
                  ],
                  title: "Customer Information",
                  showNumber: true,
                  showQuestionNumbers: "off",
                },
              ],
              startWithNewLine: false,
            },
          ],
        },
        {
          questions: [
            {
              type: "rating",
              name: "professional",
              title: "How Professional is our Company?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "responsive",
              title:
                "How Responsive is our Company to RFQ, BOQ, RFI Submissiom?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "deadline",
              title:
                "How Closely did we meet your RFQ, BOQ, RFI Submission Deadline?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "pricing",
              title:
                "Compared with our competitor, how do you rate our prices?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "pressure",
              title: "How well do we handle your request under pressure?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "understanding",
              title: "How well do we understand your business processes?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "supportive",
              title: "How supportive is our top management?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
          ],
        },
        {
          questions: [
            {
              type: "rating",
              name: "understood_requirements",
              title:
                "How well do feel our project teamunderstood your requirements?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "meet_deadlines",
              title: "How closely did we meet your project deadline?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "team_performance",
              title: "Rate the performance of our project teams",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "project_issue_resolution",
              title:
                "How would you rate our project manager's ability to resolve project issues?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "compared_to_competitors",
              title:
                "Compared to our competitors, how would you rate our service",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "project_manager_competence",
              title: "How competent is our project managers?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "truthfull_project_managers",
              title:
                "How truthfull was the information provided by our project managers?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "project_reporting",
              title: "How satisfied on our project reporting?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
          ],
        },
        {
          questions: [
            {
              type: "rating",
              name: "invoice_submission_accuracy",
              title: "How accurate is our invoice submission?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "response_to_request",
              title: "How well did our representative respond to your request?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "invoice_submission_latency",
              title:
                "Compared to our competitors, how timely is our invoice submission?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "document_uploading_invoicing_response",
              title:
                "How responsive are our we to document uploading/invoicing?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
            {
              type: "rating",
              name: "process_adherence",
              title: "How closely do we adhere to your company processes?",
              isRequired: true,
              mininumRateDescription: "Very Poor",
              maximumRateDescription: "Excellent",
            },
          ],
        },
        {
          questions: [
            {
              type: "comment",
              name: "suggestions",
              title: "What would make you more satisfied with our services",
            },
            {
              type: "text",
              name: "email",
              title:
                "Thank you for taking our survey. Your survey is almost complete, please enter your email address in the box below if you would like a feedback, then press the 'Submit' button.",
            },
          ],
        },
      ],
    };
    const survey = new Survey.Model(json);
    const answerKeys = [
      "",
      "Very Poor",
      "Poor",
      "Average",
      "Good",
      "Excellent",
    ];
    survey.onComplete.add(function (result) {
      const answers = Object.keys(result.data).map((name) => {
        const answer = result.data[name];
        const answerName = answerKeys[answer];
        const question = result.getQuestionByName(name);
        return { title: question.title, name, answer, answerName };
      });
      const email = result.data["email"];
      const contactName = result.data["contact_name"];
      const companyName = result.data["company_name"];
      return axios
        .post(
          "https://api.dostow.com/v1/store/surveyanswer",
          {
            answers,
            email,
            contactName,
            companyName,
          },
          {
            headers: {
              "x-dostow-group-access-key":
                "76cf0972-82fc-4090-8c1a-1d8af1364f12",
              "content-type": "application/json",
            },
          }
        )
        .then((resp) => {
          console.log({ resp });
        })
        .catch((error) => {
          console.log({ error });
        });
    });
    return {
      survey: survey,
    };
  },
};
</script>

<style scoped>
</style>
