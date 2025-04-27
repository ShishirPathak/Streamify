# 🎬 Streamify – Frontend

> Your all-in-one video platform with advanced viewer engagement analytics  
> Built with **React.js**, **Material UI**, **Firebase Auth**, and **Recharts**

![React](https://img.shields.io/badge/React-18-blue) ![MUI](https://img.shields.io/badge/MUI-v5-blueviolet) ![Firebase](https://img.shields.io/badge/Firebase-Auth-yellow)

---

## 🚀 Features

- 🔐 **Authentication** – Firebase-based login/signup
- 📹 **React Player** – Video streaming with custom playback tracking
- 📊 **Analytics Dashboard** – Recharts-based visual insights (retention, replays, heatmaps)
- 💬 **Comments + Likes** – Social interaction under videos
- 🎨 **Responsive Design** – Built with Material UI

---

## 🔧 Tech Stack

| Layer     | Technology              |
|-----------|--------------------------|
| UI        | React + Material UI      |
| Video     | ReactPlayer              |
| Graphs    | Recharts                 |
| Auth      | Firebase Authentication  |
| API Calls | Axios                    |

---

## 🛠️ Setup Instructions

1. Clone the repo  
```bash
git clone https://github.com/ShishirPathak/Streamify.git
cd client
```

2. Install dependencies  
```bash
npm install
```

3. Create `.env` file  
```env
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_BACKEND_URL=http://localhost:5001
```

4. Run locally  
```bash
npm start
```

---

## 📁 Folder Structure

```
client/src/
├── components/
│   ├── EngagementGraph.jsx
│   ├── ReplayForwardTimeline.jsx
│   ├── MostRewatchedHeatmap.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── MyVideos.jsx
├── context/
│   └── AuthContext.js
├── App.js
├── index.js
```

---

## 📄 License

MIT © Shishir Kumar Pathak
University of Massachusetts Dartmouth
