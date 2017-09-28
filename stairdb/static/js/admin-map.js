window.addEventListener("map:init", function (event) {

    var map = event.detail.map;
    
    var stairpointsLayer = L.tileLayer.wms("https://db.legiongis.com/geoserver/ows", {
      layers: 'hkstairs:Stairs_v5_points_wgs84',
      format: 'image/png',
      transparent: true,
      version: '1.1.1',
      attribution: "",
      maxZoom:19,
      zIndex:10,
	  tiled:false,
    }).addTo(map);

    var osm_minimap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token='+mapbox_api_key,{
        maxNativeZoom:18,
        maxZoom:19
    });
    
    map.addControl(new L.Control.MiniMap(osm_minimap));
});