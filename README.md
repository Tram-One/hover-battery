# hover-battery

<a href="https://www.npmjs.com/package/hover-battery"><img src="https://img.shields.io/npm/dm/hover-battery.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/hover-battery"><img src="https://img.shields.io/npm/v/hover-battery.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/hover-battery"><img src="https://img.shields.io/npm/l/hover-battery.svg" alt="License"></a>

LocalStorage / SessionStorage Memory for your Hover-Engine Store

By including this in your project, Hover-Engine can persist it's store across page reloads and navigation.

## Install
```sh
npm install --save hover-battery
```

## Usage
After building your engine with all the actions you plan on using, add the hover-battery action and listener. You can choose to pass in `localStorage`, `sessionStorage`, or some other object you want to write to.
```javascript
const Hover = require('hover-engine')
const battery = require('hover-battery')

const engine = new Hover()
// addActions to your engine
engine.addListener(battery(localStorage).listener)
engine.addActions(battery(localStorage).actions)
```

You must call the `addActions` with the battery **after** you have defined all your other actions.

## Usage (Tram-One)
You may want to use this with the view framework Tram-One. If you do, it's pretty much exactly the same as above.
```javascript
const Tram = require('tram-one')
const battery = require('hover-battery')

const app = new Tram()
// addActions to your app
app.addListener(battery(localStorage).listener)
app.addActions(battery(localStorage).actions)
```

## Development
First, clone this repository, and install the dependencies.
```sh
git clone https://github.com/Tram-One/hover-battery
cd hover-battery
npm install
```

You can run the tests (which use a combination of NightmareJS and Jasmine)
```sh
npm test
```

PRs Welcome!
