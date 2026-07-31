const knowledgeBase = [
  {
    id: 1,
    category: "Login",
    title: "Login Troubleshooting",

    content:
      "If users cannot log in, ask them to reset their password, clear browser cache, verify their email address, and ensure their account is active.",

    missingInfo: [
      "Registered Email Address",
      "Exact Error Message",
      "Device / Browser Name",
    ],

    followUpQuestions: [
      "Can you share your registered email address?",
      "What error message do you see while logging in?",
      "Which browser or device are you using?",
    ],

    draftResponse:
      "Thank you for contacting us. We're sorry you're facing login issues. Please share your registered email address and the exact error message so we can investigate and help you regain access.",

    internalAction:
      "Request login logs and escalate to the Authentication Team if the issue continues.",
  },

  {
    id: 2,
    category: "Billing",
    title: "Billing Issues",

    content:
      "Check payment status, verify invoice details, and confirm whether payment was successful before escalating.",

    missingInfo: [
      "Invoice Number",
      "Transaction ID",
      "Payment Date",
    ],

    followUpQuestions: [
      "Could you share your invoice number?",
      "When was the payment made?",
      "Which payment method did you use?",
    ],

    draftResponse:
      "Thank you for contacting us. We understand your billing concern. Please provide your invoice number or transaction ID so our billing team can investigate the payment and assist you as quickly as possible.",

    internalAction:
      "Escalate the ticket to the Billing Team after verifying payment records.",
  },

  {
    id: 3,
    category: "Dashboard",
    title: "Dashboard Loading",

    content:
      "Ask the user to refresh the page, clear browser cache, check internet connectivity, and verify if the issue occurs in another browser.",

    missingInfo: [
      "Browser Name",
      "Screenshot of Error",
      "Internet Speed",
    ],

    followUpQuestions: [
      "Which browser are you using?",
      "Can you share a screenshot of the issue?",
      "Does the problem occur after refreshing the page?",
    ],

    draftResponse:
      "Thank you for reporting the dashboard issue. Please share your browser details and a screenshot of the problem so we can identify the cause and assist you further.",

    internalAction:
      "Assign the ticket to the Frontend Support Team if the issue persists.",
  },

  {
    id: 4,
    category: "API",
    title: "API Support",

    content:
      "Verify the API key, endpoint URL, authentication token, request format, and response status code before investigating further.",

    missingInfo: [
      "API Endpoint",
      "Status Code",
      "Sample Request",
    ],

    followUpQuestions: [
      "Which API endpoint are you calling?",
      "What status code are you receiving?",
      "Can you share the request payload?",
    ],

    draftResponse:
      "Thank you for contacting us. Please share the API endpoint, status code, and a sample request so we can reproduce the issue and provide an accurate solution.",

    internalAction:
      "Escalate the ticket to the API Engineering Team after verifying the request details.",
  },
];

export default knowledgeBase;