const axios = require('axios');

async function getSubscriberCount(channel) {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=${channel}&key=AIzaSyBV7AHayM0ygKqgvlz-G0SlEcL9Lki41J8`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        return data.items[0].statistics.subscriberCount;
    } catch (error) {
        console.error(error);
    }
}

module.exports = getSubscriberCount;