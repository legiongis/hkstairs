window.addEventListener("map:init", function (event) {
    var map = event.detail.map;
    map.addControl(new L.Control.Fullscreen());

    var markers = new L.MarkerClusterGroup();
    var polygons = new L.geoJson();
    $.ajaxSetup( { "async": false } );  // remove line for (slow) async behaviour
    $.getJSON('http://stairculture.com/dev/json/all', function(pois) {
        
        for (var i in pois.features) {
            var props = pois.features[i].properties;
            var marker = new L.Marker(new L.LatLng(props.centroid[1], props.centroid[0]));

            var polygon = new L.Polygon(pois.features[i].geometry.coordinates[0]);
            // console.log(polygon);
            // console.log(pois.features[i].geometry.coordinates[0].toString());
            polygons.addData(pois.features[i]);
            marker.bindPopup(props.name);
            markers.addLayer(marker);
            
            // L.geoJson(data, {
          // onEachFeature: function onEachFeature(feature, layer) {
            // var props = feature.properties;
            // var content = `<img width="300" src="${props.picture_url}"/><h3>${props.title}</h3><p>${props.description}</p>`;
            // layer.bindPopup(content);
        // }}).addTo(map);
        // });
}});
    $.ajaxSetup( { "async": true } );   // remove line for (slow) async behaviour
    map.addLayer(markers);
    // map.addLayer(polygons);
    map.on('zoomend', function () {
        console.log(map.getZoom());
        if (map.getZoom() > 17)
        {
            map.addLayer(polygons);
            map.removeLayer(markers);
        } else {
            map.removeLayer(polygons);
            map.addLayer(markers);
        }
    }); 
});