# 🛡️ Project INTEGRITY  
**AI-Powered Infrastructure Transparency Platform**

> Bridging the gap between government records and on-ground reality using Agentic AI and Geospatial Intelligence.

---

## 🚨 Problem  

Across cities, citizens face a common frustration:  
- Roads break weeks after being “repaired”  
- Infrastructure exists on paper but not in reality  
- Public money is spent, but verification is impossible  

While public spending data exists, it is locked inside complex documents that ordinary citizens cannot easily understand or verify.

**Project INTEGRITY** solves this by creating a **transparent, AI-powered verification layer** between **official public records** and **citizen-reported reality**.

---

## 🧠 What We Built  

INTEGRITY is a **web-based civic intelligence platform** that allows:

- Citizens to upload real-world infrastructure evidence  
- AI to analyze government spending documents  
- Autonomous agents to audit discrepancies  
- A live map to visualize corruption and compliance  

All in real time.

---

## 🧬 How It Works  

### 1️⃣ Evidence Collection  
Users upload:
- Infrastructure photos  
- Automatic GPS location  
- Timestamped proof  

This creates verifiable on-ground evidence.

---

### 2️⃣ Government Data Extraction  
Government project PDFs are processed using AI to extract:
- Project name  
- Budget  
- Contractor  
- Completion status  

This creates a structured **official record**.

---

### 3️⃣ Agentic Audit System  

Three autonomous AI agents collaborate:

| Agent | Role |
|------|------|
| **Retriever Agent** | Fetches official government project data |
| **Audit Agent** | Compares user evidence with official records |
| **Verdict Agent** | Calculates risk score and generates reasoning |

This ensures **transparent, explainable AI auditing** instead of black-box decisions.

---

### 4️⃣ Geospatial Corruption Map  

Every report is plotted on a live map:

- 🟢 Green = Verified & compliant  
- 🔴 Red = High discrepancy / possible misuse  

Users can filter by:
- Roads  
- Sanitation  
- Public Works  

This allows citizens and authorities to instantly identify risk zones.

---

## 🔥 Key Features  

- 📄 AI-powered government document analysis  
- 📸 GPS & timestamped citizen reporting  
- 🤖 Multi-agent AI audit pipeline  
- 🗺 Interactive corruption heatmap  
- 🔐 Anonymous & privacy-first reporting  
- 🧾 AI-generated audit verdicts  

---

## 🧰 Tech Stack

**Frontend**
- Next.js (React)
- Tailwind CSS
- ShadCN UI
- Leaflet.js
- Recharts

**Backend & Cloud**
- Firebase Hosting
- Firebase Auth (Email/Password & Google OAuth)
- Firestore (Mock Government DB)
- Firebase Storage

**AI & Agents**
- Gemini / OpenAI APIs
- Vision models for image analysis
- LLM-based reasoning agents

**Geo & Maps**
- OpenStreetMap
- Browser GPS API
- Leaflet Heatmaps

---

## ⚙️ Setup Instructions

### 1. Clone and Install
```bash
git clone <repository-url>
cd INTEGRITY-hacksync
npm install
```

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select your existing project
3. Navigate to **Project Settings** (gear icon) > **General**
4. Scroll to "Your apps" and add a web app if you haven't
5. Copy the config values and update `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Enable Authentication Methods

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. Enable **Google** authentication (optional)

### 4. Configure Email Verification (Important!)

For email verification to work properly after registration:

1. In Firebase Console, go to **Authentication** > **Templates**
2. Click on **Email address verification**
3. In the action URL section, add your domain to **Authorized domains**:
   - For local development: Add `localhost`
   - For production: Add your production domain (e.g., `yourapp.com`)
4. Save the template

**Note:** The app automatically handles email verification with a custom action handler at `/auth-action`. When users click the verification link in their email, they'll be automatically redirected to the dashboard upon successful verification.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Example Flow  

1. Government record says:  
   *“Road repaired for ₹5,00,000”*  

2. Citizen uploads a photo showing potholes  

3. AI Agents detect mismatch  

4. System generates:  
   **Risk Level: HIGH – Possible fund misuse**  

5. Location turns red on the map  

---

## 🏛 Why It Matters  

Project INTEGRITY transforms citizens into **digital auditors**.  
It doesn’t accuse — it **verifies**.

By combining AI, maps, and public data, it creates:
- Accountability  
- Transparency  
- Trust  

This is how technology can strengthen democracy.

---

## 🚀 Future Scope  

- RTI & complaint auto-generation  
- Predictive corruption analytics  
- Mobile app & offline reporting  
- Integration with government open data  

---

## 🧑‍💻 Built For  

**HackSync – GDG Thadomal Shahani Engineering College**  
24-Hour Hackathon  

---

> *“Sunlight is the best disinfectant — INTEGRITY makes it digital.”*
