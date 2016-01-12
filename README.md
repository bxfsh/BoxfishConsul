# BoxfishConsul.js

## Installation

npm install boxfishconsul

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
