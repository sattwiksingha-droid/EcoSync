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
function showPopup(message) {
    const popup = document.createElement("div");
    popup.className = "simple-popup";
    popup.innerText = message;

    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 3000);
}

document.querySelectorAll(".sos-btn").forEach(btn => {

    btn.addEventListener("click", async () => {

        const type = btn.dataset.type;

        // 🔥 I AM SAFE (NO POPUP)
        if (type === "safe") {
            if (statusEl) {
                statusEl.innerText = "OK, have a nice day.";
            }

        } else {
            // 🔥 HELP + TRAPPED (POPUP)
            showPopup("We will try to reach you as quickly as possible.");

            if (statusEl) {
                statusEl.innerText =
                    type === "help"
                    ? "Help requested"
                    : "Emergency sent";
            }
        }

        // 🔥 KEEP YOUR FIREBASE CALL SAME (no change)
        try {
            await addDoc(collection(window.db, "sos"), {
                type: type,
                room: "402",
                createdAt: new Date()
            });
        } catch (e) {
            console.log(e);
        }

    });

});
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


