function makePopupContent(type,name,loc,id,url) {
    //<img width="300" src="${props.picture_url}"/>
    return `
<h4>${type}</h4>
<p>name = ${name}<br>
location = ${loc}<br>
stairid = ${id}<br>
</p>`
}

function style1(feature) {
    return {
        color: '#06406F',
        opacity: 1,
        fillColor: '#DDDDFF',
        fillOpacity: 0.9,
        weight: 3,
        radius: 6,
        clickable: true
    }
}

function style2(feature) {
    return {
        color: '#06406F',
        opacity: 1,
        fillColor: '#D00DFF',
        fillOpacity: 0.9,
        weight: 3,
        radius: 6,
        clickable: true
    }
}

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
    var polygons = new L.LayerGroup();
    
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
        
        // first get all of the markers
        for (var i in pois.features) {
            var p = pois.features[i].properties;
            var marker = new L.Marker(new L.LatLng(p.coords_y, p.coords_x));
            marker.bindPopup(makePopupContent(p.type,p.name,p.location,p.stairid));
            markers.addLayer(marker);
        }
        
        // next get all of the polygons into a geojson layer
        polygons = L.geoJson(pois, {
            onEachFeature: function onEachFeature(feature, layer) {
                var p = feature.properties;
                layer.bindPopup(makePopupContent(p.type,p.name,p.location,p.stairid));;
            },
            style: function(feature){
                switch(feature.properties.type){
                    case "Alley Stairs": return {color: "#fff000"}; break;
                    case "Building Access": return {color: "#ffff00"}; break;
                    case "Country Park Stairs": return {color: "#fffff0"}; break;
                    case "Curb Stairs": return {color: "#0ff000"}; break;
                    case "Elevated Walkway": return {color: "#f0ff00"}; break;
                    case "Escalator": return {color: "#00ff00"}; break;
                    case "Footpath": return {color: "#00fff0"}; break;
                    case "Maintenance Stairs": return {color: "#ff00ff"}; break;
                    case "Pier Stairs": return {color: "#ff00f0"}; break;
                    case "Park Stairs": return {color: "#ff0f00"}; break;
                    case "Plaza Stairs": return {color: "#ff000f"}; break;
                    case "Street Stairs": return {color: "#ff00ff"}; break;
                    case "Subway": return {color: "#0000ff"}; break;
                }
            }
        })

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