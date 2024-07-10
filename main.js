const LINK = 'https://api.adviceslip.com/advice';

const header = document.getElementById('title');
const advice = document.getElementById('advice');
const button = document.getElementById('button');

let controller = new AbortController();

const receiveAdvice = async () => {
    controller.abort();
    controller = new AbortController();
    const {signal} = controller;

    try {
        const response = await fetch(`${LINK}?timestamp=${new Date().getTime()}`, {signal});

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        header.innerText = `advice #${data.slip.id}`.toUpperCase();
        advice.innerText = `"${data.slip.advice}"`;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Fetch aborted')
        } else {
            header.innerText = '';
            advice.innerText = error.message;
        }
    }
}

button.addEventListener('click', () => receiveAdvice());





