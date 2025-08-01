// update status from internal api (api.juljeryt.pl)
// its source code isnt public for now
async function updateStatus() {
    try {
        const response = await fetch('https://api.juljeryt.pl/status');
        const data = await response.json();

        if (!data.status) return;

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
                return;
        }

        document.getElementById('status1').textContent = statusText;
        document.getElementById("status1").classList.remove("hidden");
        document.getElementById('status2').textContent = statusText;
        document.getElementById("status2").classList.remove("hidden");
    } catch (error) {
        console.error('failed to fetch status:', error);
    }
}

async function updateVisitors() {
    try {
        const response = await fetch('https://api.juljeryt.pl/counter');
        const data = await response.json();
        if (typeof data.visitors !== 'number') return;
        document.getElementById('visitors2').textContent = data.visitors;
        document.getElementById('visitors1').classList.remove('hidden');
    } catch (error) {
        console.error('failed to fetch visitors:', error);
    }
}

// animated title
function animateTitle() {
    var index = 0;
    var reverse = false;
    var animatedTitle = "jul's website";
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

// update weather from internal api (api.juljeryt.pl)
// its source code isnt public for now
async function updateWeather() {
    try {
        const response = await fetch('https://api.juljeryt.pl/weather');
        const data = await response.json();
        if (typeof data.temperature_celsius !== 'number' || typeof data.temperature_fahrenheit !== 'number') return;
        document.getElementById('weather2').textContent = `${data.temperature_celsius}°C · ${data.temperature_fahrenheit}°F`;
        document.getElementById("weather1").classList.remove("hidden");
    } catch (error) {
        console.error('failed to fetch weather:', error);
    }
}

// wait for DOM
window.addEventListener('DOMContentLoaded', () => {
    detectClockFormat();
    animateTitle();
    updateVisitors();
    setInterval(updateTime, 60000);
    document.getElementById("dynamic-header").classList.remove("hidden");
    document.getElementById('static-header').classList.add("hidden");
    document.getElementById('warning').classList.add("hidden");

    setTimeout(() => {
        updateStatus();
        updateTime();
        updateWeather();
    }, 1000);
});