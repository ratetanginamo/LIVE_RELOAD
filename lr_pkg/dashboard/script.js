// Sample JS logic
console.log('Dashboard JS loaded');

function showTime() {
    const p = document.createElement('p');
    p.textContent = `Current time: ${new Date().toLocaleTimeString()}`;
    document.getElementById('log').appendChild(p);
}

setInterval(showTime, 5000);
