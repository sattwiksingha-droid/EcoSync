# 🚨 EcoSync — Rapid Crisis Response System

<div align="center">


> **When the Grand Plaza faces a crisis, information silos cost lives.**
> EcoSync bridges the gap between distressed residents, staff, and responders — instantly.


</div>

---

## 📌 What is EcoSync?

**EcoSync** is a real-time hospitality crisis response web platform built for the **Grand Plaza Housing Complex**. It enables residents to report emergencies, trigger SOS alerts, and receive instant acknowledgment — all through a sleek, zero-friction interface.

No app download. No login wall. Just open and act.

---

## ✨ Features

### 👤 User Side
| Feature | Description |
|---|---|
| 🚪 Curtain Entry Animation | Cinematic Grand Plaza reveal on scroll |
| 📋 Emergency Report Form | Name, location, issue type — sent to Firebase instantly |
| ⚡ Quick Access SOS Buttons | One-tap: Safe ✅ / Need Help ❗ / Trapped ⚠️ |
| ✨ Particle Background | Ambient tech particle field |
| 🖱️ Cursor Trail | Glowing blue cursor trail effect |
| ⌨️ Typewriter Effect | Dynamic hero headline animation |
| 🔤 Scramble Tagline | Matrix-style text scramble on load |
| 🚨 Red Flash | Emergency atmosphere on page open |
| 🔄 Page Loader | Branded loading screen with progress bar |
| 📱 Mobile Responsive | Works on all screen sizes |
| ⭐ Feedback System | Star rating + text feedback |

### 🔐 Admin Side
| Feature | Description |
|---|---|
| 🔐 Password Protected | Hidden admin button on registration form |
| 🚨 Live Emergency Reports | Monitor all form submissions in real-time |
| ⚡ SOS Alert Tracker | Color-coded Safe / Help / Trapped alerts |
| ✅ Mark as Resolved | One-click case resolution — updates Firebase |
| 📊 Emergency Breakdown | Live bar chart — Medical vs Fire vs Other |
| ⭐ Feedback Viewer | All star ratings and comments |
| 🔄 Auto Refresh | Dashboard refreshes every 30 seconds |

---

## 🛠️ Tech Stack

```
Frontend     →  HTML5, CSS3, Vanilla JavaScript
Animations   →  GSAP 3 + ScrollTrigger
Particles    →  tsParticles v2
Database     →  Firebase Firestore v10
Fonts        →  Google Fonts (Playfair Display + Inter)
Hosting      →  Netlify
```

---

## 📁 File Structure

```
ecosync/
├── index.html       ← Main site — all user features
├── style.css        ← All styles + animations + responsive
├── script.js        ← GSAP animations + Firebase logic
├── admin.html       ← Admin dashboard — Firebase connected
└── README.md        ← You are here
```

---

## 🚀 Getting Started

```bash
# Step 1 — Clone the repo
git clone https://github.com/yourusername/ecosync.git

# Step 2 — Open in VS Code
code ecosync/

# Step 3 — Run with Live Server
# Right click index.html → "Open with Live Server"
```

> No npm install. No build step. Just open and go.

---

## 🗺️ How It Works

```
Resident faces emergency
        ↓
Opens EcoSync website
        ↓
   Two paths:
   ┌─────────────────────────────┐
   │  Emergency Report Form      │  ← Detailed report
   └─────────────────────────────┘
              OR
   ┌─────────────────────────────┐
   │  Quick Access SOS Button    │  ← One-tap alert
   └─────────────────────────────┘
        ↓
Firebase Firestore stores alert
        ↓
Admin sees it on Dashboard
        ↓
Admin marks it Resolved ✅
```

---

## 🔐 Admin Access

1. Open the site — registration form appears
2. Click the **🔐 ADMIN ACCESS** button (top-right of form)
3. Enter the admin password
4. Admin dashboard opens in a new tab

---

## 🔥 Firebase Collections

| Collection | Data Stored |
|---|---|
| `organizers` | Owner registration details |
| `reports` | Emergency form submissions |
| `sos` | Quick access SOS triggers |
| `feedbacks` | Star ratings + feedback text |

---

## 🎨 Design Philosophy

EcoSync uses a **dark emergency aesthetic** — velvet red curtains, gold accents, and electric blue tech highlights.

| Color | Meaning |
|---|---|
| 🔴 Red `#ff2e2e` | Danger, urgency, fire |
| 🔵 Blue `#00D1FF` | Tech, system, live data |
| 🟡 Gold `#C5A059` | Grand Plaza luxury branding |
| ⚫ Dark `#0A0A0A` | Night visibility, low eye strain |

---

## 🏆 Hackathon Highlights

- ✅ Real Firebase backend — not a mockup
- ✅ Fully functional admin dashboard
- ✅ Zero external dependencies beyond CDN
- ✅ Cinematic scroll experience
- ✅ Works offline for UI (Firebase fails gracefully)
- ✅ Production-ready code structure
- ✅ Mobile responsive

---

## 👨‍💻 Made By

<div align="center">

**SATTWIK SINGHA**



</div>

---

<div align="center">

*© 2026 EcoSync — Decentralized. Reliable. Fast.*

</div>
