# MMM-IFTTT
[MagicMirror](https://magicmirror.builders/) Module for [IFTTT Maker](https://ifttt.com/maker) Web Based Notifications

This module is intended to display immediate notifications of events from If-This-Then-That channels.
 Notifications will show for a default of 60 seconds before disappearing. There is no on-screen history
 of events.
 
These events will eventually integrate with the [MMM-PiLights](https://github.com/jc21/MMM-PiLights) module to enable showing LED light strip
 sequences along side the on-screen notification messages.

## Module installation

Clone the module and npm install:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/jc21/MMM-IFTTT.git
cd MMM-IFTTT
npm install
```

Add the module config to `~/MagicMirror/config/config.js`

```javascript
modules: [
    {
        module: 'MMM-IFTTT',
        position: 'lower_third',
        config: {
            displaySeconds: 60,
            fadeSpeed: 3000
        }
    }
]
```

## Testing the Mirror Endpoint

```bash
curl -X POST -H "Content-Type: application/json" \
    -d '{"message": "Your pizza is ready!"}' \
    "http://magicmirror:8080/IFTTT"
```

## Setting up a IFTTT Maker Notification

_TODO_

