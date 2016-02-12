# BoxfishConsul.js

## Installation
```bash
npm install boxfishconsul --save
```

## Usage


start up
```js
var consulService = require('boxfishconsul').init();
```

find service
```js
consulService.findService('service_name').then(function(serviceInstance) {
  // do something
}, function(error) {
  // noooo
});
```

## Run test

```
npm test
```
