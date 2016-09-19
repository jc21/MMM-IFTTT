# MMM-IFTTT
MagicMirror Module for [IFTTT](https://ifttt.com/maker) Maker Web Based Notifications

## How to install

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
        position: 'lower_third'
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

