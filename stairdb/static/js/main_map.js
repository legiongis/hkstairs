function makePopupContent(properties) {
    //<img width="300" src="${props.picture_url}"/>
    return `
<h4>${properties.type}</h4>
<p>name = ${properties.name}<br>
location = ${properties.loc}<br>
stairid = ${properties.id}<br>
</p>`
}

// UNUSED STYLE FUNCTIONS
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
    
    var colorDict = {
        "Alley Stairs": {
            "color": "#DD2D16",
            "classname": "alley-stairs",
            "markers": []
        },
        "Building Access": {
            "color": "#44201B",
            "classname": "building-access",
            "markers": []
        },
        "Country Park Stairs": {
            "color": "#AA0066",
            "classname": "country-park-stairs",
            "markers": []
        },
        "Curb Stairs": {
            "color": "#66B52D",
            "classname": "curb-stairs",
            "markers": []
        },
        "Elevated Walkway": {
            "color": "#AFDD16",
            "classname": "elevated-walkway",
            "markers": []
        },
        "Escalator": {
            "color": "#6116DD",
            "classname": "escalator",
            "markers": []
        },
        "Footpath": {
            "color": "#2B1B44",
            "classname": "footpath",
            "markers": []
        },
        "Maintenance Stairs": {
            "color": "#001BAA",
            "classname": "maintenance-stairs",
            "markers": []
        },
        "Pier Stairs": {
            "color": "#B58935",
            "classname": "pier-stairs",
            "markers": []
        },
        "Park Stairs": {
            "color": "#DD8216",
            "classname": "park-stairs",
            "markers": []
        },
        "Plaza Stairs": {
            "color": "#ff000f",
            "classname": "plaza-stairs",
            "markers": []
        },
        "Street Stairs": {
            "color": "#ff00ff",
            "classname": "street-stairs",
            "markers": []
        },
        "Subway": {
            "color": "#0000ff",
            "classname": "subway",
            "markers": []
        },
    }
    
    overlaysDict = {}
    
    // PROBLEM HERE! DIV CLASS NOT PROPERLY PASSING TO FUNCTION
    for (var i in colorDict) {
        var divClass = colorDict[i].classname;
        var typeLayer = new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                console.log(divClass);
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+divClass
                });
            },
            
            // disableClusteringAtZoom: 17,
            // spiderfyOnMaxZoom: false
        });
        overlaysDict[i] = typeLayer;
    }
    
    // makimarker name list: https://raw.githubusercontent.com/mapbox/maki/master/layouts/all.json
    L.MakiMarkers.accessToken = mapbox_api_key;
    
    var polygons = new L.LayerGroup();
    
    var allmarkersJSON = L.geoJson('',{
        pointToLayer: function(feature, latlng) {
           var icon = L.MakiMarkers.icon({icon:null, color: "#e3e311", size: "s"});
           return L.marker(latlng, {icon: icon});
        },
        onEachFeature: function onEachFeature(feature, layer) {
            var popup = makePopupContent(feature.properties);
            layer.bindPopup(popup);
            var poly = L.geoJson(feature.properties.polygon);
            showPolygon(layer,poly);
        }
    });
    
    function makePointJson(feature) {
        jsonobj = {
            "type":"Feature",
            "geometry": {
                "type":"Point",
                "coordinates": [feature.properties.coords_x,feature.properties.coords_y]
            },
            "properties": feature.properties
        }
        jsonobj.properties["polygon"] = feature;
        return jsonobj
    }
    
    function showPolygon(marker, polygon) {
        marker.on("mouseover", function (e) {
            map.addLayer(polygon);
        });
        marker.on("mouseout", function (e) {
            if (marker._popup.isOpen() === false) {
                map.removeLayer(polygon);
            };
        });
        marker.on("popupopen", function (e) {
            map.addLayer(polygon);
        });
        marker.on("popupclose", function (e) {
            map.removeLayer(polygon);
        });
    }
    
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
    
    var markers = new L.MarkerClusterGroup({
        iconCreateFunction: function(cluster) {
            return L.divIcon({
                html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                className: 'cluster-marker all-types'
            });
        },
        
        
    });
    // map.addLayer(markers);
    var markerList = [];
    
    var errors = []
    function processCategory(feature,popup,polygon,addtolayer) {
        
        var type = feature.properties.type;
        if (colorDict[type] === undefined) {
            errors.push(type);
            return
        }
        var icon = L.MakiMarkers.icon({icon:null, color: colorDict[type].color, size: "s"});
        var newMarker = new L.Marker(new L.LatLng(feature.properties.coords_y, feature.properties.coords_x),{icon:icon});
        newMarker.bindPopup(popup);
        showPolygon(newMarker,polygon);
        colorDict[type].markers.push(newMarker);
    }
    
    $.getJSON(local_url+'/json/all', function(pois) {
        
        var start_time = new Date().getTime();

        polygons = L.geoJson(pois, {
            
            onEachFeature: function onEachFeature(feature, layer) {
                var p = feature.properties;
                var popup = makePopupContent(p);
                layer.bindPopup(popup);
                
                var icon = L.MakiMarkers.icon({icon:null, color: "#e3e311", size: "s"});
                var marker = new L.Marker(new L.LatLng(p.coords_y, p.coords_x),{icon:icon});
                marker.bindPopup(popup);
                
                for (var i in overlaysDict) {
                    if (i == p.type) {
                        processCategory(feature,popup,layer,overlaysDict[i])
                    }
                }

                markers.addLayer(marker);
                showPolygon(marker,layer);
                
                allmarkersJSON.addData(makePointJson(feature));

            },
            style: function(feature){
                switch(feature.properties.type){
                    case "Alley Stairs": return {color: colorDict["Alley Stairs"].color}; break;
                    case "Building Access": return {color: colorDict["Building Access"].color}; break;
                    case "Country Park Stairs": return {color: colorDict["Country Park Stairs"].color}; break;
                    case "Curb Stairs": return {color: colorDict["Curb Stairs"].color}; break;
                    case "Elevated Walkway": return {color: colorDict["Elevated Walkway"].color}; break;
                    case "Escalator": return {color: colorDict["Escalator"].color}; break;
                    case "Footpath": return {color: colorDict["Footpath"].color}; break;
                    case "Maintenance Stairs": return {color: colorDict["Maintenance Stairs"].color}; break;
                    case "Pier Stairs": return {color: colorDict["Pier Stairs"].color}; break;
                    case "Park Stairs": return {color: colorDict["Park Stairs"].color}; break;
                    case "Plaza Stairs": return {color: colorDict["Plaza Stairs"].color}; break;
                    case "Street Stairs": return {color: colorDict["Street Stairs"].color}; break;
                    case "Subway": return {color: colorDict["Subway"].color}; break;
                }
            }
        })
        
        base_polygons = L.geoJson(pois, {
            onEachFeature: function onEachFeature(feature, layer) {
                var p = feature.properties;
                layer.bindPopup(makePopupContent(p));
            },
            style: style1
        })

        success:
            $("#loader").addClass("hidden");
            var request_time = new Date().getTime() - start_time;
            console.log("getJSON request time:");
            console.log(request_time);
            // markers.addLayers(markerList);
            
            for (var i in colorDict) {
                console.log(i+": "+colorDict[i].markers.length)
                overlaysDict[i].addLayers(colorDict[i].markers)
            }
    });

    //$.ajaxSetup( { "async": true } );   // remove line for (slow) async behaviour
    
    var outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token='+mapbox_api_key)
    
    var osm = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token='+mapbox_api_key)
    map.addLayer(osm);
    
    // 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '+
			// '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '+
			// 'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>'

    var baseLayers = {
        "OpenStreetMap": osm,
        "OpenStreetMap Outdoor": outdoors
    };

    L.control.layers(baseLayers, overlaysDict).addTo(map);
    
    var osm_minimap = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token='+mapbox_api_key)
    map.addControl(new L.Control.MiniMap(osm_minimap));

    map.on('zoomend', function () {
        console.log(map.getZoom());
        if (map.getZoom() > 17)
        {
            // map.addLayer(allmarkersJSON);
        } else {
            // map.removeLayer(allmarkersJSON);
        }
    });
});