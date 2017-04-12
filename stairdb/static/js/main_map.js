$(window).load(function () {
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (isIE) {
        $("#loader-content").html("<p>Internet Explorer not supported.<br>Use Chrome, FireFox, or Edge.</p>");
        $("#loader-content").addClass("loader-mask");
    }
});

window.addEventListener("map:init", function (event) {
    var map = event.detail.map;
    map.addControl(new L.Control.Fullscreen());

    var markers = new L.MarkerClusterGroup();
    var polygons = new L.geoJson();
    //$.ajaxSetup( { "async": false } );  // remove line for (slow) async behaviour
    
    // --- EXAMPLE of using a general ajax request instead of .getJSON. May be necessary down the road. ---
    // $.ajax({
      // url: "/json/all",
      // cache: false,
      // dataType: "json",
      // success: function(data) {
        // var request_time = new Date().getTime() - start_time;
        // console.log(".ajax time");
        // console.log(request_time);
      // },
      // error: function (request, status, error) { alert(status + ", " + error); }
    // });

    
    $.getJSON('/json/all', function(pois) {
        
        
        var start_time = new Date().getTime();
        
        
        for (var i in pois.features) {
            var props = pois.features[i].properties;
            var marker = new L.Marker(new L.LatLng(props.coords_y, props.coords_x));
            var polygon = new L.Polygon(pois.features[i].geometry.coordinates[0]);
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
        }
        success:
            $("#loader").addClass("hidden");
            var request_time = new Date().getTime() - start_time;
            console.log("getJSON request time:");
            console.log(request_time);
    });
    
    //$.ajaxSetup( { "async": true } );   // remove line for (slow) async behaviour
    
    map.addLayer(markers);
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