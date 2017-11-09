function makePopupContent(properties) {
    
    var popup_html = "";
    if (properties.name != "N/A" && properties.name != ""){
        popup_html += `<h4 style="margin-top:15px;margin:15px auto 0px auto;padding:0px;">${properties.name}</h4>`;
    }
    
    var pics = properties.photos;
    if (pics != "") {   
        var divMaxWidth = 100 * pics.length;
        var divMinWidth = 70 * pics.length;
        popup_html += `<div id="links" style="width:${divMaxWidth}px; margin-top:15px; text-align:center;">`;   
        for (var i=0; i < pics.length; i++) {
            
            // make only the first photo visible in the popup
            var display = "";
            if (i>0) {display = `style="display:none"`};
            
            var photos = JSON.parse(pics[i]);
            popup_html += `
                <a href="${local_url}${photos.image}" ${display} title="${properties.name}" data-gallery>
                    <img src="${local_url}${photos.thumbnail}"/>
                </a>
            `;
        }            
        popup_html += "</div>";
    }
    
    if (properties.handrail == null) {
        properties.handrail = "N/A";
    }
    
    if (properties.stair_ct == null) {
        properties.stair_ct = "N/A";
    }
    
    popup_html += `
        <dl>
            <dt>type</dt><dd>${properties.type}</dd>
            <dt>location</dt><dd>${properties.location}</dd>
            <dt>handrail</dt><dd>${properties.handrail}</dd>
            <dt>steps</dt><dd>${properties.stair_ct}</dd>
            <dt>stairid</dt><dd>${properties.stairid}</dd>
        </dl>
    `;

    return popup_html
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
        "All Stairs": {
            "color": "#888888",
            "classname": "all-stairs",
            "markers": []
        },
        "Alley Stairs": {
            "color": "#DD2D16",
            "classname": "alley-stairs",
            "markers": []
        },
        "Building Access": {
            "color": "#B84251",
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
            "color": "#88D7FF",
            "classname": "footpath",
            "markers": []
        },
        "Maintenance Stairs": {
            "color": "#0065AA",
            "classname": "maintenance-stairs",
            "markers": []
        },
        "Pier Stairs": {
            "color": "#B58935",
            "classname": "pier-stairs",
            "markers": []
        },
        "Park Stairs": {
            "color": "#DD6816",
            "classname": "park-stairs",
            "markers": []
        },
        "Plaza Stairs": {
            "color": "#D1BF00",
            "classname": "plaza-stairs",
            "markers": []
        },
        "Street Stairs": {
            "color": "#3FB512",
            "classname": "street-stairs",
            "markers": []
        },
        // "Subway": {
            // "color": "#EA0016",
            // "classname": "subway",
            // "markers": []
        // },
    }

    var getClusterRadius = function(zoom){
        if (zoom < 17) {
            return 80
        }
        if (zoom == 17) {
            return 50
        }
        if (zoom == 18) {
            return 20
        }
    }
    
    var overlaysDict = {
        "All Stairs": new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+colorDict["All Stairs"].classname
                });
            },
            maxClusterRadius: getClusterRadius,
        }),
        "Alley Stairs": new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+colorDict["Alley Stairs"].classname
                });
            },
            maxClusterRadius: getClusterRadius,
        }),
        "Building Access": new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+colorDict["Building Access"].classname
                });
            },
            maxClusterRadius: getClusterRadius,
        }),
        "Country Park Stairs": new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+colorDict["Country Park Stairs"].classname
                });
            },
            maxClusterRadius: getClusterRadius,
        }),
        "Curb Stairs": new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+colorDict["Curb Stairs"].classname
                });
            },
            maxClusterRadius: getClusterRadius,
        }),
        "Elevated Walkway": new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+colorDict["Elevated Walkway"].classname
                });
            },
            maxClusterRadius: getClusterRadius,
        }),
        "Escalator": new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+colorDict["Escalator"].classname
                });
            },
            maxClusterRadius: getClusterRadius,
        }),
        "Footpath": new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+colorDict["Footpath"].classname
                });
            },
            maxClusterRadius: getClusterRadius,
        }),
        "Maintenance Stairs": new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+colorDict["Maintenance Stairs"].classname
                });
            },
            maxClusterRadius: getClusterRadius,
        }),
        "Pier Stairs": new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+colorDict["Pier Stairs"].classname
                });
            },
            maxClusterRadius: getClusterRadius,
        }),
        "Park Stairs": new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+colorDict["Park Stairs"].classname
                });
            },
            maxClusterRadius: getClusterRadius,
        }),
        "Plaza Stairs": new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+colorDict["Plaza Stairs"].classname
                });
            },
            maxClusterRadius: getClusterRadius,
        }),
        "Street Stairs": new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
                return L.divIcon({
                    html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    className: 'cluster-marker '+colorDict["Street Stairs"].classname
                });
            },
            maxClusterRadius: getClusterRadius,
        }),
        // "Subway": new L.MarkerClusterGroup({
            // iconCreateFunction: function(cluster) {
                // return L.divIcon({
                    // html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    // className: 'cluster-marker '+colorDict["Subway"].classname
                // });
            // },
            // maxClusterRadius: getClusterRadius,
        // })
    }
    
    // PROBLEM HERE! DIV CLASS NOT PROPERLY PASSING TO FUNCTION
    // for (var i in colorDict) {
        // var divClass = colorDict[i].classname;
        // console.log(divClass);
        // var typeLayer = new L.MarkerClusterGroup({
            // iconCreateFunction: function(cluster) {
                // console.log(divClass);
                // return L.divIcon({
                    // html: '<div><p>' + cluster.getChildCount() + '</p></div>',
                    // className: 'cluster-marker '+divClass
                // });
            // },
        // });
        // overlaysDict[i] = typeLayer;
    // }
    
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
            layer.bindPopup(popup, {
                maxWidth: "auto"
            });
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
    
    function showPolygon(marker, polygon, popup) {
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
		var icon = null;
		if (feature.properties.photos != ""){ var icon = "camera" };
        var icon = L.MakiMarkers.icon({icon:icon, color: colorDict[type].color, size: "s"});
        var newMarker = new L.Marker(new L.LatLng(feature.properties.coords_y, feature.properties.coords_x),{icon:icon,riseonhover:true});
        newMarker.bindPopup(popup);
        showPolygon(newMarker,polygon);
        colorDict[type].markers.push(newMarker);
    }
    
    $.getJSON(local_url+'/stair/?format=json', function(pois) {
        
        var start_time = new Date().getTime();

        polygons = L.geoJson(pois, {
            
            onEachFeature: function onEachFeature(feature, layer) {
                var p = feature.properties;
                // console.log(p);
                var popup = makePopupContent(p);
                // console.log(popup);
                // layer.bindPopup(popup);
                
                for (var i in overlaysDict) {
                    if (i == p.type) { processCategory(feature,popup,layer,overlaysDict[i]) }
                };
				
				var icon = null;
				if (p.photos != ""){ var icon = "camera" };
                
                var icon = L.MakiMarkers.icon({icon:icon,color:"#555555",size:"s"});
                var marker = new L.Marker(new L.LatLng(p.coords_y, p.coords_x),{icon:icon,riseonhover:true});
                marker.bindPopup(popup);
                
                
                // markers.addLayer(marker);
                showPolygon(marker,layer);
                
                colorDict["All Stairs"].markers.push(marker);
                // allmarkersJSON.addData(makePointJson(feature));

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
                    // case "Subway": return {color: colorDict["Subway"].color}; break;
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
            // console.log(pois);
            // markers.addLayers(markerList);
            
            for (var i in colorDict) {
                console.log(i+": "+colorDict[i].markers.length)
                overlaysDict[i].addLayers(colorDict[i].markers)
            }
    });

    //$.ajaxSetup( { "async": true } );   // remove line for (slow) async behaviour
    
    var outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token='+mapbox_api_key,{maxNativeZoom:18,maxZoom:19})
    var mapbox_osm = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token='+mapbox_api_key,{maxNativeZoom:18,maxZoom:19});
    var linemap = L.tileLayer('http://stairculture.com/tiles/hk_clr1_2/{z}/{x}/{y}.png',{maxZoom:19});
    map.addLayer(outdoors);
    
    // 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '+
			// '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '+
			// 'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>'

    var baseLayers = {
        "Open Street Map": outdoors,
        "City Map": linemap
    };

    map.addLayer(overlaysDict["All Stairs"]);
    
    var linemap2 = L.tileLayer('http://stairculture.com/tiles/hk_clr1_2/{z}/{x}/{y}.png',{maxZoom:19});
    overlaysDict["City Map"] = linemap2;

    L.control.layers(baseLayers, overlaysDict).addTo(map);
    
    var osm_minimap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token='+mapbox_api_key,{maxNativeZoom:18,maxZoom:19})
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