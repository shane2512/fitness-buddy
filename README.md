
# 🏋️‍♀️ Fitness Buddy - AI Health & Fitness Coach

**Fitness Buddy** is an AI-powered virtual health and fitness assistant that helps users maintain a healthy lifestyle by providing personalized workout suggestions, nutritional advice, motivational tips, and habit-building support—anytime, anywhere.

> 💡 Built using React, Tailwind CSS, IBM Watson Assistant, and IBM Cloud Functions.

---

## 🌐 Live Demo

Coming soon...

---

## 🎯 Problem Statement

Modern lifestyles make it difficult for individuals to stay healthy due to:
- Lack of personalized guidance
- Busy schedules
- Motivation challenges

**Fitness Buddy** solves this by offering:
- 🤖 A smart AI chatbot for workouts, nutrition, and motivation
- 📱 A beautiful, responsive FitOn-style frontend
- ☁️ Serverless backend powered by IBM Cloud Lite services

---

## 🚀 Features

- 🧘‍♂️ Personalized workout recommendations (beginner → advanced)
- 🥗 Healthy meal ideas and snack suggestions
- 💬 Conversational AI assistant (Watson)
- 📈 Habit-building encouragement and daily fitness tips
- 💻 Responsive, mobile-first UI built with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer         | Tech Used                            |
|---------------|--------------------------------------|
| Frontend      | React + Tailwind CSS                 |
| Chatbot AI    | IBM Watson Assistant (Web Chat)      |
| Backend (API) | IBM Cloud Functions (Node.js / Python) |
| Hosting       | Netlify / IBM Cloud App Services     |

---

## 📂 Project Structure

```
fitness-buddy/
├── public/
│   └── index.html     # Watson Assistant script injected here
├── src/
│   ├── components/    # Tailwind-based UI components
│   ├── pages/         # Pages like Home, Dashboard, etc.
│   └── App.jsx
├── .env               # (optional) API keys if needed
├── README.md
└── package.json
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/jhirschv/Online-Fitness-App-Frontend.git
cd Online-Fitness-App-Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add IBM Watson Assistant Web Chat

In `public/index.html`, paste the Watson Assistant integration script just before the `</body>` tag:

```html
<script>
  window.watsonAssistantChatOptions = {
      integrationID: "YOUR_INTEGRATION_ID",
      region: "YOUR_REGION",
      serviceInstanceID: "YOUR_SERVICE_INSTANCE_ID",
      onLoad: function(instance) { instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });
</script>
```

### 4. Start the App

```bash
npm run dev
# or
npm start
```

---

## 🧠 IBM Watson Assistant Setup

1. Go to [IBM Cloud](https://cloud.ibm.com/)
2. Create a Watson Assistant service
3. Create an Assistant + Dialog skills
4. Train intents like:
   - "Suggest a workout"
   - "Give me a meal plan"
   - "Motivate me"
5. Deploy using **Web Chat** integration
6. Copy credentials into your frontend `index.html`

---



## 📸 Screenshots

> Add screenshots of your chatbot and UI here

---

## 📄 License

MIT License — feel free to use and remix!

---

## 🙌 Acknowledgements

- [IBM Watson Assistant](https://cloud.ibm.com/catalog/services/watson-assistant)
- [Tailwind UI](https://tailwindui.com/)
- [FitOn App](https://fitonapp.com/) – inspiration
