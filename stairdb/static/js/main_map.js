// maki marker icons can be inserted into the markers. here's the list of icons:
// https://raw.githubusercontent.com/mapbox/maki/master/layouts/all.json
L.MakiMarkers.accessToken = mapbox_api_key;

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

// this object holds color information for each layer.
// it also serves as a holding ground for the individual markers in
// each layer before they are added to the real layers in overlaysDict.
var colorDict = {
    "All Stairs": {
        "color": "#555555",
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
}

// this object holds all of the actual layers (L.MarkerClusterGroup()) that are added
// to the map when passed to the layers control. this must remain a large object like this
// for each layer to be rendered properly (tried iterating a list to make these, and had issues)
// note that Subway stairs do not have a layer (as per e-mail from MC April 18, 2017)
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
}

// this function constructs the pop-up content for stair features
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
                <a href="${photos.image}" ${display} title="${properties.name}" data-gallery>
                    <img src="${photos.thumbnail}"/>
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

$(window).load(function () {
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (isIE) {
        $("#loader-content").html("<p>Internet Explorer not supported.<br>Use Chrome, FireFox, or Edge.</p>");
        $("#loader-content").addClass("loader-mask");
    }
});

window.addEventListener("map:init", function (event) {

    // calling this function binds the polygon to the marker
    // so it is displayed on mouse hover or click
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

    // make new marker from feature properties and then add to the correct colorDict array
    function processCategory(properties,iconSymbol,popup,polygon,addtolayer) {

        var icon = L.MakiMarkers.icon({icon:iconSymbol,color:colorDict[properties.type].color,size:"s"});
        var newMarker = new L.Marker(
            new L.LatLng(properties.coords_y, properties.coords_x),
            {icon:icon,riseonhover:true}
        );
        newMarker.bindPopup(popup);
        showPolygon(newMarker,polygon);
        colorDict[properties.type].markers.push(newMarker);
        
    }

    // get all the stair features as geojson from the database, iterate and process each one.
    // no layers/markers are actually added to the map here, markers are just created and sorted.
    var start_time = new Date().getTime();
    $.getJSON(local_url+'/stair/?format=json', function(pois) {
        L.geoJson(pois, {
            onEachFeature: function onEachFeature(feature, layer) {

                var p = feature.properties;

                // skip if this is an invalid stair type
                if (!colorDict.hasOwnProperty(p.type)){
                    if (p.type != "Subway") {
                        console.log("invalid type:"+p.type+" "+p.stairid);
                    }
                    return
                }

                // set icon symbol based on presence of photo, set color based on layer
                if (p.photos != ""){ var iconSymbol = "camera" } else { var iconSymbol = null };
                var icon = L.MakiMarkers.icon({icon:iconSymbol,color:colorDict["All Stairs"].color,size:"s"});

                // create marker which will be added to the All Stairs layer
                var marker = new L.Marker(
                    new L.LatLng(p.coords_y, p.coords_x),
                    {icon:icon,riseonhover:true}
                );

                var popup = makePopupContent(p);
                marker.bindPopup(popup);
                showPolygon(marker,layer);
                colorDict["All Stairs"].markers.push(marker);

                // now send the properties off to be made in to a new marker that is added to the
                // correct colorDict markers array. pass the "layer" (which is the polygon) along to be
                // bound to this new marker with the showPolygon function
                for (var i in overlaysDict) {
                    if (i == p.type) { processCategory(p,iconSymbol,popup,layer,overlaysDict[i]) }
                };

            },
            // this style function is applied to the polygon that is represented in the geojson
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

        success:
            $("#loader").addClass("hidden");

            var request_time = new Date().getTime() - start_time;
            console.log("getJSON request time: "+request_time/1000 + " sec");

            // now that all markers have been added to colorDict, push them
            // to the actual cluster layers that are stored in overlaysDict
            for (var i in colorDict) {
                console.log(i+": "+colorDict[i].markers.length)
                overlaysDict[i].addLayers(colorDict[i].markers)
            }
    });

    var map = event.detail.map;
    map.addControl(new L.Control.Fullscreen());

    // create the basemap layers
    var mbAttributeText = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '+
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '+
        'Imagery &copy; <a href="http://mapbox.com">Mapbox</a>';
    var outdoorsUrl = 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?'+
        'access_token='+mapbox_api_key;

    var outdoors = L.tileLayer(outdoorsUrl,
        {maxNativeZoom:18,maxZoom:19,attribution:mbAttributeText}
    );

    var linemap = L.tileLayer('https://tiles.legiongis.com/hk_clr1_2/{z}/{x}/{y}.png',
        {maxZoom:19}
    );

    var baseLayers = {
        "Open Street Map": outdoors,
        "City Map": linemap
    };

    // make layers control and add to map
    L.control.layers(baseLayers, overlaysDict).addTo(map);

    // add default layers to map
    map.addLayer(outdoors);
    map.addLayer(overlaysDict["All Stairs"]);

    // create second osm basemap layer for minimap and add minimap
    var osm_minimap = L.tileLayer(outdoorsUrl,
        {maxNativeZoom:18,maxZoom:19}
    );
    map.addControl(new L.Control.MiniMap(osm_minimap));

});