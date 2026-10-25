/* =========================================================
   NOOR → AZEEM
   Online / Waiting Notification System
   ========================================================= */


/* =========================================================
   PUSHBULLET CONFIG
   ========================================================= */

const PUSHBULLET_API_KEY = "PASTE_YOUR_PUSHBULLET_TOKEN_HERE";


/* =========================================================
   PAGE ELEMENTS
   ========================================================= */

const accessDenied = document.getElementById("accessDenied");
const alarmPage = document.getElementById("alarmPage");

const wakeButton = document.getElementById("wakeButton");
const buttonText = document.getElementById("buttonText");
const buttonIcon = document.getElementById("buttonIcon");

const statusBox = document.getElementById("statusBox");

const emojiRain = document.getElementById("emojiRain");
const sparkleLayer = document.getElementById("sparkleLayer");


/* =========================================================
   ACCESS CHECK
   ---------------------------------------------------------
   The page is opened through welcome.html.

   welcome.html should set:

   sessionStorage.setItem("openedFromWelcome", "true");

   before opening alarm.html.
   ========================================================= */

function checkPageAccess() {

    const openedFromWelcome =
        sessionStorage.getItem("openedFromWelcome") === "true";

    if (!openedFromWelcome) {

        if (alarmPage) {
            alarmPage.style.display = "none";
        }

        if (accessDenied) {
            accessDenied.classList.add("show");
        }

        return false;
    }

    if (alarmPage) {
        alarmPage.style.display = "";
    }

    if (accessDenied) {
        accessDenied.classList.remove("show");
    }

    return true;
}


/* =========================================================
   INITIAL ACCESS CHECK
   ========================================================= */

const pageAccessGranted = checkPageAccess();


/* =========================================================
   EMOJIS
   ========================================================= */

const cuteEmojis = [
    "💗",
    "💕",
    "💖",
    "💞",
    "🌸",
    "🌷",
    "🦋",
    "✨",
    "💌",
    "🌙",
    "⭐",
    "🎀"
];


/* =========================================================
   CREATE FALLING EMOJI
   ========================================================= */

function createFallingEmoji() {

    if (!emojiRain || !pageAccessGranted) {
        return;
    }

    const emoji = document.createElement("div");

    emoji.textContent =
        cuteEmojis[
            Math.floor(Math.random() * cuteEmojis.length)
        ];

    emoji.style.position = "fixed";
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.top = "-30px";
    emoji.style.zIndex = "1";
    emoji.style.pointerEvents = "none";
    emoji.style.userSelect = "none";

    emoji.style.fontSize =
        (12 + Math.random() * 15) + "px";

    emoji.style.opacity =
        (0.35 + Math.random() * 0.45).toFixed(2);

    emoji.style.animation =
        `emojiFall ${5 + Math.random() * 5}s linear forwards`;

    emojiRain.appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    }, 11000);
}


/* =========================================================
   EMOJI FALL ANIMATION
   ========================================================= */

const emojiStyle = document.createElement("style");

emojiStyle.textContent = `
    @keyframes emojiFall {

        0% {
            transform:
                translate3d(0, -20px, 0)
                rotate(0deg);
        }

        50% {
            transform:
                translate3d(
                    ${Math.random() > 0.5 ? "18px" : "-18px"},
                    50vh,
                    0
                )
                rotate(160deg);
        }

        100% {
            transform:
                translate3d(
                    ${Math.random() > 0.5 ? "-25px" : "25px"},
                    110vh,
                    0
                )
                rotate(330deg);
        }
    }
`;

document.head.appendChild(emojiStyle);


/* =========================================================
   START LIGHT EMOJI RAIN
   ========================================================= */

if (pageAccessGranted) {

    setInterval(() => {

        createFallingEmoji();

    }, 850);
}


/* =========================================================
   SPARKLE EFFECT
   ========================================================= */

function createSparkle(x, y) {

    if (!sparkleLayer || !pageAccessGranted) {
        return;
    }

    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.textContent =
        Math.random() > 0.5 ? "✦" : "✧";

    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";

    sparkle.style.fontSize =
        (10 + Math.random() * 12) + "px";

    sparkleLayer.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1500);
}


/* =========================================================
   RANDOM BACKGROUND SPARKLES
   ========================================================= */

if (pageAccessGranted) {

    setInterval(() => {

        createSparkle(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        );

    }, 1300);
}


/* =========================================================
   CLICK PARTICLES
   ========================================================= */

function createClickParticles(x, y) {

    const particles = [
        "💗",
        "💕",
        "✨",
        "💌",
        "🌸",
        "♡"
    ];

    for (let i = 0; i < 8; i++) {

        const particle =
            document.createElement("div");

        particle.className = "click-particle";

        particle.textContent =
            particles[
                Math.floor(Math.random() * particles.length)
            ];

        particle.style.left = x + "px";
        particle.style.top = y + "px";

        particle.style.setProperty(
            "--move-x",
            `${(Math.random() - 0.5) * 130}px`
        );

        particle.style.setProperty(
            "--move-y",
            `${-30 - Math.random() * 100}px`
        );

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}


/* =========================================================
   DESKTOP CLICK EFFECT
   ========================================================= */

document.addEventListener("click", (event) => {

    if (!pageAccessGranted) {
        return;
    }

    createClickParticles(
        event.clientX,
        event.clientY
    );

});


/* =========================================================
   MOBILE TOUCH EFFECT
   ========================================================= */

document.addEventListener(
    "touchstart",
    (event) => {

        if (!pageAccessGranted) {
            return;
        }

        const touch = event.touches[0];

        if (!touch) {
            return;
        }

        createClickParticles(
            touch.clientX,
            touch.clientY
        );

    },
    {
        passive: true
    }
);


/* =========================================================
   STATUS MESSAGE
   ========================================================= */

function showStatus(message, type = "normal") {

    if (!statusBox) {
        return;
    }

    statusBox.textContent = message;

    if (type === "success") {

        statusBox.style.color = "#d33c7a";
        statusBox.style.background =
            "rgba(255, 229, 239, 0.95)";

    } else if (type === "error") {

        statusBox.style.color = "#a74343";
        statusBox.style.background =
            "rgba(255, 235, 235, 0.95)";

    } else {

        statusBox.style.color = "#765268";
        statusBox.style.background =
            "rgba(255, 239, 246, 0.9)";
    }
}


/* =========================================================
   BUTTON LOADING STATE
   ========================================================= */

function setLoadingState() {

    if (!wakeButton) {
        return;
    }

    wakeButton.classList.add("is-sending");

    if (buttonIcon) {
        buttonIcon.textContent = "💌";
    }

    if (buttonText) {
        buttonText.textContent =
            "TELLING AZEEM...";
    }
}


/* =========================================================
   BUTTON NORMAL STATE
   ========================================================= */

function resetButton() {

    if (!wakeButton) {
        return;
    }

    wakeButton.classList.remove("is-sending");

    if (buttonIcon) {
        buttonIcon.textContent = "💗";
    }

    if (buttonText) {
        buttonText.textContent =
            "TELL AZEEM I'M ONLINE";
    }
}


/* =========================================================
   SEND PUSHBULLET NOTIFICATION
   ========================================================= */

async function notifyAzeem() {

    if (!PUSHBULLET_API_KEY ||
        PUSHBULLET_API_KEY ===
        "PASTE_YOUR_PUSHBULLET_TOKEN_HERE") {

        throw new Error(
            "Pushbullet API token is missing."
        );
    }


    const response = await fetch(
        "https://api.pushbullet.com/v2/pushes",
        {
            method: "POST",

            headers: {
                "Access-Token":
                    PUSHBULLET_API_KEY,

                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({

                type: "note",

                title:
                    "💗 Noor is online",

                body:
                    "Noor is online and wants to talk to you. " +
                    "She just pressed the button to let you know " +
                    "she's here and waiting for you. 🌸💌"
            })
        }
    );


    if (!response.ok) {

        let errorMessage =
            "Pushbullet request failed.";

        try {

            const errorData =
                await response.json();

            if (errorData.error) {

                errorMessage =
                    errorData.error.message ||
                    errorMessage;
            }

        } catch (error) {
            // Ignore JSON parsing error.
        }

        throw new Error(errorMessage);
    }


    return await response.json();
}


/* =========================================================
   SUCCESS EFFECT
   ========================================================= */

function successCelebration() {

    const celebrationEmojis = [
        "💗",
        "💖",
        "💕",
        "💞",
        "✨",
        "🌸",
        "💌",
        "🦋"
    ];

    for (let i = 0; i < 28; i++) {

        setTimeout(() => {

            const x =
                window.innerWidth / 2 +
                (Math.random() - 0.5) * 260;

            const y =
                window.innerHeight / 2 +
                (Math.random() - 0.5) * 160;

            const particle =
                document.createElement("div");

            particle.className =
                "click-particle";

            particle.textContent =
                celebrationEmojis[
                    Math.floor(
                        Math.random() *
                        celebrationEmojis.length
                    )
                ];

            particle.style.left = x + "px";
            particle.style.top = y + "px";

            particle.style.setProperty(
                "--move-x",
                `${(Math.random() - 0.5) * 250}px`
            );

            particle.style.setProperty(
                "--move-y",
                `${-60 - Math.random() * 180}px`
            );

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 1100);

        }, i * 35);
    }
}


/* =========================================================
   MAIN BUTTON ACTION
   ========================================================= */

if (wakeButton && pageAccessGranted) {

    wakeButton.addEventListener(
        "click",
        async (event) => {

            createClickParticles(
                event.clientX ||
                window.innerWidth / 2,

                event.clientY ||
                window.innerHeight / 2
            );


            setLoadingState();

            showStatus(
                "Sending a little message to Azeem... 💌",
                "normal"
            );


            try {

                await notifyAzeem();


                showStatus(
                    "Sent! 💗 Azeem has been told that Noor is online and waiting. 🌸",
                    "success"
                );


                if (buttonIcon) {
                    buttonIcon.textContent = "💖";
                }

                if (buttonText) {
                    buttonText.textContent =
                        "AZEEM HAS BEEN TOLD ♡";
                }


                successCelebration();


                /*
                 * Keep the success state for a few seconds,
                 * then allow Noor to send another notification.
                 */

                setTimeout(() => {

                    resetButton();

                    showStatus(
                        "You can tap again whenever you want to let Azeem know you're here. 💗",
                        "normal"
                    );

                }, 5000);


            } catch (error) {

                console.error(
                    "Pushbullet error:",
                    error
                );


                showStatus(
                    "Oops 💔 Message could not be sent. Please try again.",
                    "error"
                );


                resetButton();
            }

        }
    );
}


/* =========================================================
   INITIAL PAGE MESSAGE
   ========================================================= */

if (pageAccessGranted) {

    setTimeout(() => {

        showStatus(
            "Whenever Noor is online or waiting, just tap the button. 💗",
            "normal"
        );

    }, 900);
}


/* =========================================================
   PREVENT ACCIDENTAL DOUBLE SUBMIT
   ========================================================= */

window.addEventListener(
    "beforeunload",
    () => {

        if (wakeButton) {
            wakeButton.disabled = true;
        }

    }
);
