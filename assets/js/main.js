// instead of fetching status from the server
// we just assume that im sleeping between 23:00 and 07:00 sharp
// shhh nobody has to know
function updateStatus() {
    const hours = Number(new Date().toLocaleString('en-US', {timeZone: 'Europe/Warsaw', hour: '2-digit', hour12: false}));
    
    let statusText = (hours >= 23 || hours < 7) ? '😴 Sleeping' : '🟢 Online';
    document.getElementById('status').textContent = statusText;
    document.getElementById('status').classList.remove('hidden');
}

// get a random motd based on the current time
function getMotd() {
    const hours = new Date().getHours();
    let motdList;

    if (hours >= 7 && hours < 11) {
        // 07:00 - 11:00
        motdList = [
            "🌻 Good morning",
            "☀️ Have a nice day",
            "🌅 Rise and shine",
            "☕ Time for coffee"
        ];
    } else if (hours >= 11 && hours < 14) {
        // 11:00 - 14:00
        motdList = [
            "🍽️ Good noon",
            "😋 Enjoy your lunch",
            "🌞 Keep smiling",
            "🥗 Take a break"
        ];
    } else if (hours >= 14 && hours < 18) {
        // 14:00 - 18:00
        motdList = [
            "🌤️ Good afternoon",
            "💪 Keep it up",
            "🌺 Stay positive",
            "🍵 Have a tea break"
        ];
    } else if (hours >= 18 && hours < 22) {
        // 18:00 - 22:00
        motdList = [
            "🌇 Good evening",
            "🛋️ Relax and unwind",
            "🍕 Dinner time",
            "🌆 Hope you had a good day"
        ];
    } else {
        // 22:00 - 07:00
        motdList = [
            "🌙 Good night",
            "😴 Sleep well",
            "🌌 Sweet dreams",
            "💤 Time to rest"
        ];
    }

    return motdList[Math.floor(Math.random() * motdList.length)];
}

function updateMotd() {
    document.getElementById('motd').textContent = getMotd();
    document.getElementById('motd').classList.remove('hidden');
}

// animated title
function animateTitle() {
    let index = 0;
    let reverse = false;
    const animatedTitle = "jul's website";
    setInterval(function () {
        index = (index + (reverse ? -1 : 1)) % (animatedTitle.length + 1);
        if (index === 0 || index === animatedTitle.length) reverse = !reverse;
        document.title = animatedTitle.slice(0, (index ? index : 1));
    }, 300);
}

// fallback
let userClockFormat = false;

// detect users clock format (12h or 24h)
function detectClockFormat() {
    const date = new Date();
    const formatted = new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "numeric"
    }).format(date);
    userClockFormat = /AM|PM/i.test(formatted);
}

// update time
function updateTime() {
    document.getElementById('time').textContent = new Date().toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: userClockFormat,
        timeZone: 'Europe/Warsaw'
    });
}

// click on span.path ->  copy current url to clipboard
function setupPathCopy() {
    const path = document.querySelector('.path');
    if (path) {
        path.addEventListener('click', async () => {
            try {
                // copy current url to clipboard
                await navigator.clipboard.writeText(window.location.href);

                // store original text and color
                const originalText = path.textContent;
                const originalColor = path.style.color;

                // show green copied text
                path.textContent = 'copied';
                path.style.color = '#4CAF50';

                // revetr after 3 seconds
                setTimeout(() => {
                    path.textContent = originalText;
                    path.style.color = originalColor;
                }, 3000);

            } catch (err) {
                // show user that error happend
                const originalText = path.textContent;
                const originalColor = path.style.color;
                path.textContent = 'error';
                path.style.color = '#af4c4c';

                setTimeout(() => {
                    path.textContent = originalText;
                    path.style.color = originalColor;
                }, 3000);
            }
        });
    }
}

function animatedFavicon() {
    const emojis = ["🍕", "🍔", "🌭", "🍟", "🌮", "🌯", "🥙", "🍗", "🥪", "🥞", "🍪", "🧁", "🍦", "🍨", "🍫"];
    let i = 0;

    function setFavicon(emoji) {
        const svg = `
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
                <text y='.9em' font-size='90'>${emoji}</text>
            </svg>`;
        const link = document.querySelector("link[rel='icon']") || document.createElement("link");
        link.rel = "icon";
        link.href = "data:image/svg+xml," + encodeURIComponent(svg);
        document.head.appendChild(link);
    }

    setInterval(() => {
        setFavicon(emojis[i]);
        i = (i + 1) % emojis.length;
    }, 1000);
}

// wait for dom
window.addEventListener('DOMContentLoaded', () => {
    detectClockFormat();
    animateTitle();
    setInterval(updateTime, 60000);
    document.getElementById("dynamic-header").classList.remove("hidden");
    document.getElementById('static-header').classList.add("hidden");
    document.getElementById('warning').classList.add("hidden");
    setTimeout(() => {
        updateStatus();
        updateTime();
        updateMotd();
    }, 100);
    setupPathCopy();
    animatedFavicon();
});