window.addEventListener("map:init", function (event) {

    var map = event.detail.map;
    // map.addControl(new L.Control.Fullscreen());
    
    var stairpointsLayer = L.tileLayer.wms("http://legiongis.com/geoserver/hkstairs/wms", {
      layers: 'hkstairs:Stairs_v5points_wgs84',
      format: 'image/png',
      transparent: true,
      version: '1.1.1',
      attribution: "",
      maxZoom:19,
    }).addTo(map);
    
    var osm_minimap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token='+mapbox_api_key,{maxNativeZoom:18,maxZoom:19})
    
    map.addControl(new L.Control.MiniMap(osm_minimap));
    
    map.on('baselayerchange', function() {
        console.log('changed');
        map.removeLayer(stairpointsLayer);
        map.addLayer(stairpointsLayer);
    });

});