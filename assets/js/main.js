// update status from internal api (api.jul.pl)
// its source code isnt public for now
// fetch all data from an ass endpoint
// wonderful name isnt it?
async function updateAss() {
    try {
        const response = await fetch('https://api.jul.rip/ass');
        const data = await response.json();

        // status
        if (data.status) {
            let statusText;
            switch (data.status) {
                case 'online':
                    statusText = 'Online 🟢';
                    break;
                case 'dnd':
                    statusText = 'Do Not Disturb ⛔';
                    break;
                case 'idle':
                    statusText = 'Idle 🌙';
                    break;
                case 'offline':
                    statusText = 'Offline 🔴';
                    break;
                default:
                    statusText = '';
            }
            if (statusText) {
                document.getElementById('status').textContent = statusText;
                document.getElementById("status").classList.remove("hidden");
            }
        }

        // weather
        if (typeof data.temperature_celsius === 'number' && typeof data.temperature_fahrenheit === 'number') {
            document.getElementById('weather2').textContent = `${data.temperature_celsius}°C · ${data.temperature_fahrenheit}°F`;
            document.getElementById("weather1").classList.remove("hidden");
        }
    } catch (error) {
        console.error('failed to fetch data:', error);
    }
}

// get a random motd based on the current time
function getMotd() {
    const now = new Date();
    const hours = now.getHours();
    let motdList;

    if (hours >= 7 && hours < 11) {
        // 07:00 - 11:00
        motdList = [
            "🌻 Good morning, ☀️ Have a nice day",
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

// wait for dom
window.addEventListener('DOMContentLoaded', () => {
    detectClockFormat();
    animateTitle();
    setInterval(updateTime, 60000);
    document.getElementById("dynamic-header").classList.remove("hidden");
    document.getElementById('static-header').classList.add("hidden");
    document.getElementById('warning').classList.add("hidden");

    setTimeout(() => {
        updateAss();
        updateTime();
        updateMotd();
    }, 1000);
});