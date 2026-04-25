let pct = 0;
const loaderBar = document.getElementById('loaderBar');
const loaderPct = document.getElementById('loaderPct');
const loaderInterval = setInterval(() => {
  pct += 2;
  if (loaderBar) loaderBar.style.width = pct + '%';
  if (loaderPct) loaderPct.textContent = pct + '%';
  if (pct >= 100) {
    clearInterval(loaderInterval);
    setTimeout(() => {
      gsap.to("#loader", { opacity: 0, duration: 0.5, onComplete: () => {
        document.getElementById('loader').style.display = 'none';
      }});
    }, 200);
  }
}, 20);
gsap.registerPlugin(ScrollTrigger);

// =====================
// MAIN CURTAIN TIMELINE
// =====================
const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "60% top",
        scrub: 1,
    }
});

// 🚪 CURTAINS OPEN
tl.to(".left-curtain", { xPercent: -100, duration: 1.5 }, 0)
  .to(".right-curtain", { xPercent: 100, duration: 1.5 }, 0)

// 👇 UI FADE
  .to(".scroll-indicator", { opacity: 0, duration: 0.3 }, 0)

// 🚑 AMBULANCE EFFECT
  .to(".ambulance-zone", { opacity: 0.3, duration: 1 }, 0.3)
  .to("#ambulanceImg", { rotation: 360, scale: 1.5, duration: 3 }, 0);


// =====================
// 🏬 GRAND PLAZA SHUTTER 
// =====================
gsap.to(".shop-front", {
    y: "-100%",          
    ease: "none",
    scrollTrigger: {
        trigger: ".shop-front",
        start: "top top",  
        end: "bottom top",
        scrub: true,
        pin: true          
    }
});
// =====================
// FEATURE CARDS
// =====================
// On page load
gsap.from(".feature-card", {
    y: 100,
    opacity: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".features",
        start: "top 85%",
        toggleActions: "play none none none"
    }
});

// It will animate again on scroll
gsap.from(".feature-card", {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".features",
        start: "top 85%",
        toggleActions: "play none none none"
    }
});


// =====================
// AMBULANCE VANISH
// =====================
gsap.to(".ambulance-zone", {
    opacity: 0,
    y: -100, // optional upward vanish
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".map-section",  
        start: "top 85%",          
        end: "top 60%",
        scrub: true
    }
});

// =====================
// AUTH FORM
// =====================
document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = this.owner_name.value;
    const email = this.email.value;
    const password = this.password.value;

    try {
        await addDoc(collection(window.db, "organizers"), {
            name,
            email,
            password,
            createdAt: new Date()
        });

        console.log("Registration Successful!");

        gsap.to("#auth-overlay", {
            duration: 0.8,
            opacity: 0,
            pointerEvents: "none",
            onComplete: () => {
                document.getElementById('auth-overlay').style.display = 'none';
            }
        });

    } catch (error) {
        console.error("Error:", error);
        alert("Firebase error: " + error.message);
    }
});


// =====================
// EMERGENCY CARDS
// =====================
gsap.from(".em-card", {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
        trigger: ".emergency-grid",
        start: "top 80%"
    }
});


// =====================
// REPORT SECTION
// =====================
gsap.from(".report-section", {
    opacity: 0,
    y: 100,
    duration: 1,
    scrollTrigger: {
        trigger: ".report-section",
        start: "top 85%"
    }
});


// =====================
// REPORT FORM SUBMIT
// =====================
document.getElementById("reportForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const name = this.name.value;
    const type = this.type.value;
    const location = this.location.value;
    const details = this.details.value;

    try {
        await addDoc(collection(window.db, "reports"), {
            name,
            type,
            location,
            details,
            status: "pending",
            createdAt: new Date()
        });

        //  INLINE NOTIFICATION TEXT
        const notify = document.createElement("div");
        notify.className = "form-notify";
        notify.innerHTML = `
            <h4>🚨 Emergency Report Sent</h4>
            <p>
                Okay then, have a wonderful day. Thank you for reaching out, and we’ll be there as quickly as possible.
            </p>
        `;

        document.querySelector(".report-section").prepend(notify);

        // smooth show animation
        gsap.fromTo(notify,
            { opacity: 0, y: -20, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
        );

        // auto remove after 9 sec
        setTimeout(() => {
            gsap.to(notify, {
                opacity: 0,
                y: -10,
                duration: 0.4,
                onComplete: () => notify.remove()
            });
        }, 9000);

        this.reset();

    } catch (err) {
        console.error(err);
        alert("Error sending report");
    }
});   
// =====================
// ✅ FINAL BUTTON BEHAVIOR
// =====================

const statusEl = document.getElementById("sosStatus");

// simple popup (lightweight)
function showPopup(message, style = "") {
    const popup = document.createElement("div");
    popup.className = "simple-popup " + style;
    popup.innerText = message;

    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 3000);
}

function initSOS() {
    if (!window.db || !window.addDoc || !window.collection) {
        setTimeout(initSOS, 300);
        return;
    }

    document.querySelectorAll(".sos-btn").forEach(btn => {

        btn.addEventListener("click", async () => {

            const type = btn.dataset.type;

            // 🔥 I AM SAFE
            if (type === "safe") {
                showPopup("✅ OK, have a nice day!", "safe-popup");
                if (statusEl) statusEl.innerText = "OK, have a nice day.";

            } else {
                // 🔥 HELP + TRAPPED
                showPopup("🚨 We will reach you as quickly as possible.", "danger-popup");

                if (statusEl) {
                    statusEl.innerText = type === "help" ? "Help requested" : "Emergency sent";
                }
            }

            // 🔥 FIREBASE FIXED
            try {
                await window.addDoc(window.collection(window.db, "sos"), {
                    type: type,
                    room: "402",
                    createdAt: new Date()
                });
            } catch (e) {
                console.log(e);
            }

        });

    });
}

initSOS();
// =====================
// ⭐ FEEDBACK FORM
// =====================

// rating state
let feedbackRating = 0;

const feedbackStars = document.querySelectorAll("#stars span");
const feedbackBtn = document.getElementById("submitBtn");
const feedbackInput = document.getElementById("feedback");
const feedbackSuccess = document.getElementById("successMsg");

// ⭐ Star Click
if (feedbackStars.length) {
    feedbackStars.forEach((star, index) => {
        star.addEventListener("click", () => {
            feedbackRating = index + 1;

            feedbackStars.forEach(s => s.classList.remove("active"));
            for (let i = 0; i < feedbackRating; i++) {
                feedbackStars[i].classList.add("active");
            }
        });
    });
}

// 📩 Submit Feedback
if (feedbackBtn) {
    feedbackBtn.addEventListener("click", async () => {

        const text = feedbackInput.value.trim();

        if (feedbackRating === 0) {
            alert("Please select rating ⭐");
            return;
        }

        try {
            // 🔥 SAME STYLE AS YOUR CODE (window.db use)
            await addDoc(collection(window.db, "feedbacks"), {
                rating: feedbackRating,
                feedback: text,
                createdAt: new Date()
            });

            // ✅ success UI
            if (feedbackSuccess) {
                feedbackSuccess.style.display = "block";
            }

            // reset
            feedbackInput.value = "";
            feedbackRating = 0;
            feedbackStars.forEach(s => s.classList.remove("active"));

        } catch (err) {
            console.error(err);
            alert("Error saving feedback");
        }
    });
}
// ===== PARTICLES =====
tsParticles.load("tsparticles", {
  particles: {
    number: { value: 60 },
    color: { value: ["#00D1FF", "#ff2e2e", "#C5A059"] },
    links: { enable: true, color: "#00D1FF", opacity: 0.2 },
    move: { enable: true, speed: 1 },
    opacity: { value: 0.3 },
    size: { value: 2 }
  }
});

// ===== LIVE CLOCK =====
setInterval(() => {
  const el = document.getElementById('liveClock');
  if (el) el.textContent = new Date().toLocaleTimeString('en-IN', {hour12: false});
}, 1000);

// ===== CURSOR TRAIL =====
document.addEventListener('mousemove', e => {
  const dot = document.createElement('div');
  dot.style.cssText = `position:fixed;width:6px;height:6px;border-radius:50%;
    background:#00D1FF;left:${e.clientX}px;top:${e.clientY}px;
    pointer-events:none;z-index:99999;box-shadow:0 0 10px #00D1FF;
    transition:opacity 0.6s;`;
  document.body.appendChild(dot);
  setTimeout(() => { dot.style.opacity='0'; setTimeout(()=>dot.remove(),600); }, 100);
});

// ===== SOUND ON SOS =====
function playBeep(freq=440, duration=0.3) {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(); osc.stop(ctx.currentTime + duration);
}

document.querySelector('.sos-btn.help')?.addEventListener('click', () => playBeep(440));
document.querySelector('.sos-btn.safe')?.addEventListener('click', () => playBeep(660));

// ===== ALERT COUNTER =====
let count = 0;
const target = 47;
const alertEl = document.getElementById('alertCount');
if (alertEl) {
  const iv = setInterval(() => {
    count++;
    alertEl.textContent = count;
    if (count >= target) clearInterval(iv);
  }, 40);
}

// ===== NEON LINE SWEEP =====
document.querySelectorAll('section').forEach(section => {
  const line = document.createElement('div');
  line.style.cssText = `height:2px;width:0;background:linear-gradient(90deg,#00D1FF,#ff2e2e);
    border-radius:2px;margin-bottom:20px;box-shadow:0 0 12px #00D1FF;`;
  section.prepend(line);
  gsap.to(line, {
    width:'100%', duration:1,
    scrollTrigger: { trigger:section, start:'top 80%' }
  });
});

const words = ["Rapid Crisis Response", "Instant Alerts", "Zero Delay. Zero Doubt."];
let i = 0, j = 0, isDeleting = false;
const el = document.querySelector('.hero-text h2 .accent');
if (el) {
  function type() {
    const current = words[i];
    el.textContent = isDeleting ? current.substring(0, j--) : current.substring(0, j++);
    if (!isDeleting && j === current.length + 1) { isDeleting = true; setTimeout(type, 1500); return; }
    if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % words.length; }
    setTimeout(type, isDeleting ? 50 : 90);
  }
  type();
}
function playSiren() {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  gain.gain.value = 0.1;
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.5);
  osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 1);
  osc.start(); osc.stop(ctx.currentTime + 1.2);
}

playSiren();

const heroH2 = document.querySelector('.hero-text h2');
if (heroH2) {
  const text = "Rapid Crisis";
  heroH2.innerHTML = text.split('').map(c =>
    `<span style="display:inline-block;opacity:0;transform:translateY(80px)">${c === ' ' ? '&nbsp;' : c}</span>`
  ).join('') + '<br><span class="accent"></span>';

  gsap.to('.hero-text h2 span', {
    opacity: 1, y: 0, duration: 0.6,
    stagger: 0.05, ease: "back.out(1.7)",
    scrollTrigger: { trigger: '.hero-text', start: 'top 80%' }
  });
}

gsap.fromTo("body",
  { backgroundColor: "#3a0000" },
  { backgroundColor: "#0a0a0a", duration: 1.5, ease: "power2.out" }
);
const tagline = document.querySelector('.tagline');
if (tagline) {
  const final = "HACK2SKILL CHALLENGE";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let iteration = 0;
  const interval = setInterval(() => {
    tagline.textContent = final.split('').map((c, i) =>
      i < iteration ? c :
      c === ' ' ? ' ' :
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    if (iteration >= final.length) clearInterval(interval);
    iteration += 0.5;
  }, 50);
}
