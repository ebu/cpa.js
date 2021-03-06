cpa.js
======

[![Build Status](https://travis-ci.org/ebu/cpa.js.svg?branch=master)](https://travis-ci.org/ebu/cpa.js)

This project contains a library which implements the Cross-Platform Authentication
protocol for `Clients` and is provided and maintained as reference implementation.

This software implements version 1.0 of the Cross-Platform Authentication Protocol ([ETSI TS 103 407](https://portal.etsi.org/webapp/WorkProgram/Report_WorkItem.asp?WKI_ID=47970)).

More information on Cross-Platform Authentication: [EBU Tech](http://tech.ebu.ch/cpa)

## Usage

### Installation with Bower

[Bower](https://github.com/bower/bower) is a package manager for the web.

> bower install cpa.js


### RequireJS

You can use [RequireJS](http://requirejs.org/) in order to include the cpa.js library.

> HTML:

    <script data-main="js/main" src="require.js"></script>

> js/main.js

    require.config({
      baseUrl: 'js',
      paths: {
        'cpa': '../bower_components/cpa.js/dist/cpa.min'
      }
    });

    require(['cpa'], function(cpa) {
      cpa.device.registerClient('http://local.ebu.io:8001/', '1', '2', '3',
        function(err, info) {
          console.log(err, info);
        });
    });


### Stand-alone

You can use the cpa.js library directly in the HTML page:

    <script src="cpa.js"></script>

The `cpa` object is used to expose the library:

    <script>
       cpa.device.registerClient('http://local.ebu.io:8001/', '1', '2', '3',
         function(err, info) {
           console.log(err, info);
         });
    </script>

### Node.js

Install the cpa.js package using NPM:

    npm install cpa.js

Use `require` to access within Node.js:

    var cpa = require('cpa.js');

    cpa.device.registerClient('http://local.ebu.io:8001/', '1', '2', '3',
         function(err, info) {
           console.log(err, info);
         });


## Development

### Build

> npm install

> bower install

> grunt


## Related Projects

* [Tutorial](https://github.com/ebu/cpa-tutorial)
* [Authentication Provider](https://github.com/ebu/cpa-auth-provider)
* [Service Provider](https://github.com/ebu/cpa-service-provider)
* [Android Client](https://github.com/ebu/cpa-android)
* [iOS Client](https://github.com/ebu/cpa-ios)

## Contributors

* [Michael Barroco](https://github.com/barroco) (EBU)
* [Chris Needham](https://github.com/chrisn) (BBC)
* [Andrew Nicolaou](https://github.com/andrewn) (BBC)

## Copyright & License

Copyright (c) 2014-2016, EBU-UER Technology & Innovation

The code is under BSD (3-Clause) License. (see LICENSE.txt)
