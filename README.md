# jmars-demo

## Run server
```sh
ruby server.rb
```
And visit <http://localhost:3000/>. Try opening multiple tabs!

## Changing the port

You can change the port number by setting the `$PORT` environment variable before invoking any of the scripts above, e.g.,

```sh
PORT=3001 ruby server.rb
```

## Get wms capabilities

Capabilities contains information about the WMS services, layers, styles, etc

http://jmars.asu.edu/maps/custom?user=slin@dius.com.au&service=wms&wmsver=1.1.1&request=GetCapabilities
http://jmars.asu.edu/maps/filter/mars?jmars_timestamp=1467164961524&service=wms&wmsver=1.1.1&request=GetCapabilities