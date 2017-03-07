var dataurl = '/json/all';

  window.addEventListener("map:init", function (event) {
    var map = event.detail.map;
    map.addControl(new L.Control.Fullscreen());
    
    var markers = new L.MarkerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 80
});

// Style function for thegeojson layer
function getColor(status) {
    if (status =='Pier Stairs'){return "#FF006F" }
    else {return "#FCFF15"}
}

//loading the geojson for the power plants
var geojsonAjax = new L.GeoJSON.AJAX(dataurl,{
    style: function(feature) {
        return {
            fillColor: getColor(feature.properties.Type),
            color: getColor(feature.properties.Type),
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7
        }
    },
    // pointToLayer: function (feature, latlng) {
        // return L.circleMarker(latlng)}});
    // }
});
geojsonAjax.on('data:loaded', function () {
    markers.addLayer(geojsonAjax);
    map.addLayer(markers);
});
    
    
    
    
    
    // fetch(dataurl)
      // .then(function(resp) {
        // return resp.json();
      // })
      // .then(function(data) {
        // L.geoJson(data, {
          // onEachFeature: function onEachFeature(feature, layer) {
            // var props = feature.properties;
            // var content = `<img width="300" src="${props.picture_url}"/><h3>${props.title}</h3><p>${props.description}</p>`;
            // layer.bindPopup(content);
        // }}).addTo(map);
      // });
  });