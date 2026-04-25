# 🚨 EcoSync — Rapid Crisis Response System

> **Built for HACK2SKILL Challenge**
> *When the Grand Plaza faces a crisis, information silos cost lives. EcoSync bridges the gap between distressed residents, staff, and responders — instantly.*

---

## ⚡ Live Demo

> Open `index.html` in any modern browser and scroll to activate the Emergency Hub.

---

## 🧠 What is EcoSync?

**EcoSync** is a real-time hospitality crisis response web platform built for the **Grand Plaza Housing Complex**. It enables residents to report emergencies, trigger SOS alerts, and receive instant acknowledgment — all through a sleek, zero-friction interface.

No app download. No login wall. Just open and act.

---

## 🔥 Key Features

| Feature | Description |
|---|---|
| 🚪 **Curtain Entry Animation** | Cinematic Grand Plaza reveal on scroll |
| 📋 **Emergency Report Form** | Name, location, issue type — sent to Firebase instantly |
| ⚡ **Quick Access SOS Buttons** | One-tap: Safe / Need Help / Trapped |
| 🔊 **Audio Feedback** | Distinct beep tones per SOS type |
| 📳 **Shake Effect** | Screen shake on critical danger alert |
| 🟢 **Live System Status** | Real-time "SYSTEM LIVE" indicator in navbar |
| 🕐 **Live Clock** | 24hr clock synced to Indian Standard Time |
| ✨ **Particle Background** | Ambient tech particle field |
| 🖱️ **Cursor Trail** | Glowing blue cursor trail effect |
| 📡 **Firebase Firestore** | All reports, SOS alerts & feedback saved to cloud |
| ⭐ **Feedback System** | Star rating + text feedback with cloud storage |
| 📱 **Mobile Responsive** | Works on all screen sizes |

---

## 🛠️ Tech Stack

```
Frontend      →  HTML5, CSS3, Vanilla JavaScript
Animations    →  GSAP 3 + ScrollTrigger
Particles     →  tsParticles v2
Database      →  Firebase Firestore (v10)
Fonts         →  Google Fonts (Playfair Display + Inter)
Hosting       →  Static (no backend required)
```

---

## 📁 Project Structure

```
ecosync/
├── index.html       # Main HTML — all sections
├── style.css        # All styles, animations, responsive
└── script.js        # GSAP animations + Firebase logic
```

---

```

> No npm install. No build step. No dependencies to manage. Just open and go.

---

## 🗺️ How It Works

```
Resident faces emergency
        ↓
Opens EcoSync website
        ↓
   Two paths available:
   ┌─────────────────────────────┐
   │  Fill Emergency Form        │  ← Name + Location + Issue type
   │  (for detailed reports)     │
   └─────────────────────────────┘
              OR
   ┌─────────────────────────────┐
   │  Quick Access SOS Button    │  ← One tap: Safe / Help / Trapped
   │  (for instant alerts)       │
   └─────────────────────────────┘
        ↓
Firebase Firestore receives alert
        ↓
EcoSync team responds immediately
```

---

## 🔥 Firebase Collections

| Collection | Data Stored |
|---|---|
| `organizers` | Owner registration details |
| `reports` | Emergency form submissions |
| `sos` | Quick access button triggers |
| `feedbacks` | Star ratings + feedback text |

---

## 🎨 Design Philosophy

EcoSync uses a **dark emergency aesthetic** — velvet red curtains, gold accents, and electric blue tech highlights. Every design decision serves the use case:

- **Red** = danger, urgency, fire
- **Blue (#00D1FF)** = tech, system, live data
- **Gold (#C5A059)** = Grand Plaza luxury branding
- **Dark background** = reduces eye strain during night emergencies

---

## 🏆 Hackathon Highlights

- ✅ Real Firebase backend — not a mockup
- ✅ Zero external dependencies beyond CDN links
- ✅ Works offline for UI (Firebase calls fail gracefully)
- ✅ Cinematic scroll experience judges won't forget
- ✅ Accessibility-conscious color contrast
- ✅ Production-ready code structure

---

## 👨‍💻 Made By

**SATTWIK SINGHA**
Built with 🔥 for HACK2SKILL 2026

---

*© 2026 EcoSync — Decentralized. Reliable. Fast.*
