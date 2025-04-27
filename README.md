# 🧠 Streamify – Backend

> Node.js + Express backend powering video analytics and streaming services  
> Supports user engagement tracking, storage on AWS S3, and MongoDB analytics

![Node.js](https://img.shields.io/badge/Node.js-v18-green) ![MongoDB](https://img.shields.io/badge/MongoDB-hosted-brightgreen) ![AWS](https://img.shields.io/badge/AWS-S3-orange)

---

## 📦 Key Features

- 📈 **Engagement API** – Logs play, pause, rewind, skip, and completion events
- 📊 **Analytics API** – Computes retention, drop-offs, and replay data
- 🗃️ **MongoDB** – Stores video metadata and engagement logs
- ☁️ **AWS S3** – Video file uploads via Multer-S3
- 🔐 **JWT Auth** – Secured with Firebase-issued tokens

---

## 🛠️ Tech Stack

| Feature       | Tech Used           |
|---------------|---------------------|
| Runtime       | Node.js (v18)       |
| Framework     | Express.js          |
| DB            | MongoDB + Mongoose  |
| Storage       | AWS S3              |
| Auth          | Firebase JWT        |
| Analytics     | Custom logic        |

---

## ⚙️ Setup Instructions

1. Clone the repo  
```bash
git clone https://github.com/ShishirPathak/Streamify.git
cd server
```

2. Install dependencies  
```bash
npm install
```

3. Create `.env` file  
```env
PORT=5001
MONGO_URI=your_mongodb_uri
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_BUCKET_NAME=your_bucket
AWS_REGION=your_region
```

4. Run the server  
```bash
npm run dev
```

---

## 📁 API Routes Summary

| Method | Route                            | Description                          |
|--------|----------------------------------|--------------------------------------|
| POST   | `/api/uploadVideo`              | Upload video to AWS S3               |
| GET    | `/api/getAllVideo/:email`       | List all videos by user              |
| POST   | `/api/track-progress`           | Log viewer interaction               |
| GET    | `/api/retention/:videoId`       | Viewer retention graph data          |
| GET    | `/api/replayForward/:videoId`   | Replay vs forward data               |
| GET    | `/api/engagement/:videoId`      | Raw engagement data per session      |

---

## 📂 Folder Structure

```
server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── .env
├── server.js
```

---

## 🧪 Sample JSON Output (Retention)

```json
[
  { "time": 170, "retained": 52.3, "drop_off": false, "skipped": false },
  { "time": 171, "retained": 47.8, "drop_off": true, "skipped": false }
]
```

---

## 📝 License

MIT © Shishir Kumar Pathak
University of Massachusetts Dartmouth 
