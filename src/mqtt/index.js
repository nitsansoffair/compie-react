const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', function () {
    client.subscribe('presence', (err) => {
        if (!err) {
            return;
        }

        console.log('Connect');
    });
});

export default {
    client
};
