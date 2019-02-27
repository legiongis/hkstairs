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
    "Search": {
        "color": "#FF69B4",
        "classname": "featured",
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
    // "Search": new L.LayerGroup(),
    // "Featured": new L.MarkerClusterGroup({
    //     iconCreateFunction: function(cluster) {
    //         return L.divIcon({
    //             html: '<div><p>' + cluster.getChildCount() + '</p></div>',
    //             className: 'cluster-marker '+colorDict["Featured"].classname
    //         });
    //     },
    //     maxClusterRadius: getClusterRadius,
    // }),
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



var searchLayer = new L.LayerGroup();


$(window).load(function () {
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (isIE) {
        $("#loader-content").html("<p>Internet Explorer not supported.<br>Use Chrome, FireFox, or Edge.</p>");
        $("#loader-content").addClass("loader-mask");
    }
});

// create array for accessing later
window.stairs = {};

window.map = {};
window.sidebar;

window.addEventListener("map:init", function (event) {

    // calling this function binds the polygon to the marker
    // so it is displayed on mouse hover or click
    function showPolygon(marker, polygon, popup) {
        marker.on("mouseover", function (e) {
            map.addLayer(polygon);
        });
        marker.on("mouseout", function (e) {
            // this is throwing an error
            var popup = marker.getPopup();
            if ( !popup.isOpen() ) {
                map.removeLayer(polygon);
            };
        });
        marker.on("popupopen", function (e) { 
            // center marker on page  
            // var px = map.project(e.popup._latlng); // find the pixel location on the map where the popup anchor is
            // px.y -= e.popup._container.clientHeight/2 // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
            // map.panTo(map.unproject(px),{animate: true}); // pan to new center 
            console.log('popup open. Let us pan')
            map.setView(e.popup._latlng);

            // show polygon
            polygon.setStyle({fillColor:'#0000FF'});
            map.addLayer(polygon);

            // show side panel
            openSidePanel(polygon.feature.properties);
            
            // add stair_id to url
            appendStairid(polygon.feature.properties.stairid); 
        });
        marker.on("popupclose", function (e) {
            map.removeLayer(polygon);
            removeStairid();
            closeSidePanel();
        });
    }


    // this function constructs the pop-up content for stair features
    function makePopupContent(properties) {

        var popup_html = "";
        if (properties.name != "N/A" && properties.name != ""){
            popup_html += `<h4 style="margin-top:15px;margin:15px auto 0px auto;padding:0px;">${properties.name} / #${properties.stairid}</h4>`;
        } else {
            popup_html += `<h4 style="margin-top:15px;margin:15px auto 0px auto;padding:0px;">#${properties.stairid}</h4>`;
        }

        var pics = properties.photos;
        if (pics != "") {   
            var divMaxWidth = 100 * pics.length;
            var divMinWidth = 70 * pics.length;
            //popup_html += `<div id="links" style="width:${divMaxWidth}px; margin-top:15px; text-align:center;">`;   
            popup_html += `<div id="links" style="width:150px; margin-top:15px; text-align:center;">`;   
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

        return popup_html
    }

    // this function constructs the pop-up content for stair features
    function makePanelContent(properties) {

        var popup_html = "";
        if (properties.name != "N/A" && properties.name != ""){
            popup_html += `<h4 style="margin-top:15px;margin:15px auto 0px auto;padding:0px;">${properties.name} / #${properties.stairid}</h4>`;
        } else {
            popup_html += `<h4 style="margin-top:15px;margin:15px auto 0px auto;padding:0px;">#${properties.stairid}</h4>`;
        }

        // var pics = properties.photos;
        // if (pics != "") {   
        //     var divMaxWidth = 100 * pics.length;
        //     var divMinWidth = 70 * pics.length;
        //     popup_html += `<div id="links" style="width:${divMaxWidth}px; margin-top:15px; text-align:center;">`;   
        //     for (var i=0; i < pics.length; i++) {

        //         // make only the first photo visible in the popup
        //         var display = "";
        //         if (i>0) {display = `style="display:none"`};

        //         var photos = JSON.parse(pics[i]);
        //         popup_html += `
        //             <a href="${photos.image}" ${display} title="${properties.name}" data-gallery>
        //                 <img src="${photos.thumbnail}"/>
        //             </a>
        //         `;
        //     }
        //     popup_html += "</div>";
        // }

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
                <dt>materials</dt><dd>${properties.materials_formatted}</dd>
                <dt>handrail</dt><dd>${properties.handrail}</dd>
                <dt>steps</dt><dd>${properties.stair_ct}</dd>
            </dl>
        `;


        popup_html += `<a href="/admin/stairdb/stair/${properties.id}/change/" class="edit-button">Edit</a>`;

        return popup_html
    }


    /**
     * Open Popup by ID (stairid)
     */
    function openPopupById(id) {
        //console.log('loaded stairs: '+Object.keys(window.stairs).length)
        if( window.stairs[id] ) {
            if( ! window.stairs[id].openPopup() ) {
                console.log("opening stairid: " + id);
            } else {
                console.log("changing lat/lng for: " + id);
                var zoom = 19,
                    lat = parseFloat(window.stairs[id]._latlng.lat),
                    lng = parseFloat(window.stairs[id]._latlng.lng),
                    precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));
                var newhash = zoom+'/'+lat.toFixed(precision)+'/'+lng.toFixed(precision)
                window.location.hash = newhash;
                setTimeout( function() {
                    window.stairs[id].openPopup();
                }, 500 );
            }
        }
    }

    // add stairid to url
    function appendStairid(stairid) {   
        const params = new URLSearchParams(location.search)
        params.set('stairid', stairid);

        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params + window.location.hash;
        if (history.pushState) {
            window.history.pushState({path:newurl},'',newurl);
        } else {
            document.location.href = newurl;
        }
    }

    // remove stairid to url
    function removeStairid() {   
        const params = new URLSearchParams(location.search)
        params.delete('stairid');

        if( params.entries().length ) {
            var search = '?' + params
        } else {
            var search = ''
        }
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + search + window.location.hash;
        if (history.pushState) {
            window.history.pushState({path:newurl},'',newurl);
        } else {
            document.location.href = newurl;
        }
    }

    // make new marker from feature properties and then add to the correct colorDict array
    function processCategory(properties,iconSymbol,popup,polygon,addtolayer) {

        var icon = L.MakiMarkers.icon({icon:iconSymbol,color:colorDict[properties.type].color,size:"s"});
        var newMarker = new L.Marker(
            new L.LatLng(properties.coords_y, properties.coords_x),
            {icon:icon,riseonhover:true,title:properties.name}
        );
        newMarker.bindPopup(popup);
        showPolygon(newMarker,polygon);
        colorDict[properties.type].markers.push(newMarker);
        
    }

    // open side panel and add content from marker
    function openSidePanel(p) {
        sidebar.setContent(makePanelContent(p));
        $('#sidebar').removeClass('about-message');
        sidebar.show();
    }

    // close side panel
    function closeSidePanel() {
        //setTimeout(function() {
            //if( !$('#sidebar').hasClass('about-message') ) sidebar.hide();
        //},500);
    }

    // get all the stair features as geojson from the database, iterate and process each one.
    // no layers/markers are actually added to the map here, markers are just created and sorted.
    var start_time = new Date().getTime();
    $.getJSON(local_url+'/stair/?format=json', function(pois) {

        // add properties to search      
        //displayFeatures(pois.features, layers, icons);  
        //var props = ['name', 'stairid', 'materials_formatted'];
        fuseSearchCtrl.indexFeatures(pois, ['name', 'stairid', 'materials_formatted']);


        window.geojson = L.geoJson(pois, {
            onEachFeature: function(feature, layer) {

                var p = feature.properties;

                feature.polygon = layer;

                // skip if this is an invalid stair type
                if (!colorDict.hasOwnProperty(p.type)){
                    if (p.type != "Subway") {
                        console.log("invalid type: "+p.type+" for stairid: "+p.stairid);
                    }
                    return
                }


                // set icon symbol based on presence of photo, set color based on layer
                if (p.photos != ""){ var iconSymbol = "camera" } else { var iconSymbol = null };
                var icon = L.MakiMarkers.icon({icon:iconSymbol,color:colorDict["All Stairs"].color,size:"s"});

                // create marker which will be added to the All Stairs layer
                var marker = new L.Marker(
                    new L.LatLng(p.coords_y, p.coords_x),
                    {icon:icon,riseonhover:true,title:p.name}
                );
                marker.features = p

                var popup = makePopupContent(p);
                //var popup = L.popup(makePopupContent(p));
                marker.bindPopup(popup);

                // marker.on("click", function(e) {
                //     openSidePanel(p);
                // });

                window.stairs[p.stairid] = marker;

                showPolygon(marker,layer);
                colorDict["All Stairs"].markers.push(marker);


                // create search layer
                var icon = L.MakiMarkers.icon({icon:null,color:colorDict['Search'].color,size:"s"});
                var newMarker = new L.Marker(
                    new L.LatLng(p.coords_y, p.coords_x),
                    {icon:icon,riseonhover:true,title:p.name}
                );                
                newMarker.bindPopup(popup);
                feature.layer = newMarker;
                showPolygon(newMarker,layer);
                colorDict["Search"].markers.push(newMarker);


                // Set featured
                // if (p.featured == true) {        
                //     var icon = L.MakiMarkers.icon({icon:iconSymbol,color:colorDict['Featured'].color,size:"s"});
                //     var newMarker = new L.Marker(
                //         new L.LatLng(p.coords_y, p.coords_x),
                //         {icon:icon,riseonhover:true,title:p.name}
                //     );                
                //     newMarker.bindPopup(popup);
                //     // newMarker.on("click", function(e) {
                //     //     openSidePanel(p);
                //     // });
                //     showPolygon(newMarker,layer);
                //     colorDict["Featured"].markers.push(newMarker);
                // }


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
                    case "Featured": return {color: colorDict["Featured"].color}; break;
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
                if(overlaysDict[i]) {
                    //console.log(i+": "+colorDict[i].markers.length)
                    overlaysDict[i].addLayers(colorDict[i].markers);
                }
            }

            // Create an unclustered version of All Stairs
            for (var m in colorDict["Search"].markers) {
                // set all search markers to transparent
                colorDict["Search"].markers[m].setOpacity(0);
                searchLayer.addLayer(colorDict["Search"].markers[m]);
            }

            // Look for a stairid parameter and if it exists, open the popup
            const params = new URLSearchParams(document.location.search)
            var stairid = params.get('stairid');
            if(stairid) {
                // delay this call, in order to wait for everything to be loaded
                setTimeout( function() {
                    openPopupById(stairid);
                }, 500 );
            }


            // preload search from params
            var searchTerm = search_params.getAll('s');
            if(searchTerm.length) {
                $('.search-input').val(searchTerm[0]);
                fuseSearchCtrl.searchFeatures(searchTerm[0]);
                fuseSearchCtrl.showPanel();
            }

    });

    // Create control for About panel
    var AboutControl =  L.Control.extend({        
        options: {
            position: 'topleft'
        },

        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-about');
            var button = L.DomUtil.create('a', 'leaflet-control-about-button');
            button.append('?');

            container.append(button);
            // container.style.backgroundColor = 'white';     
            // container.style.backgroundImage = "url(http://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)";
            // container.style.backgroundSize = "30px 30px";
            container.style.width = '30px';
            container.style.height = '30px';

            container.onclick = function(){
                if( sidebar.isVisible() ) {
                    if( $('#sidebar').hasClass('about-message') ) {
                        sidebar.hide();
                    } else {
                        showAbout();
                    }
                } else {
                    showAbout();
                }
            }

            return container;
        }
    });


    // This shows the About panel once per session
    function showAboutFirst() {
        if (sessionStorage.getItem('AnnouncementOnce') !== 'true') {
            showAbout();

            sessionStorage.setItem('AnnouncementOnce','true');
        }
    }

    // This shows the About panel once per session
    function showAbout() {
        const about = `
            <h1>Welcome to<br/>the Hong Kong<br/>Stair Archive Map</h1>
            <p>This project is the work of Melissa Cate Christ, <a href="http://transversestudio.com/">Transverse Studio</a> and <a href="https://stairculture.com/">Stair Culture</a>.</p>
            <p>It includes data gathered from the game <a href="https://quest.stairculture.com/">Stair Quest</a>. Join in the fun and add to the data collection here.</p>
            `;
        $('#sidebar').html(about);
        $('#sidebar').addClass('about-message');

        if( !sidebar.isVisible() ) sidebar.show();
    }


    // Main Code

    //var icons = setupIcons();

    map = event.detail.map;
    //var pane = map.createPane('fixed', document.getElementById('main'));
    var hash = new L.Hash(map);
    map.addControl(new L.Control.Fullscreen());


    // Create Sidebar
    sidebar = L.control.sidebar('sidebar', {
        position: 'left',
        closeButton: true,
        autoPan: false
    });

    // Add Sidebar to controls
    map.addControl(sidebar);
    showAboutFirst();

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

    // override default layers from parameters
    var search_params = new URLSearchParams(window.location.search);
    var layers = search_params.getAll('layer');
    if(layers.length) {
        for (var i in layers) {
            console.log('show '+layers[i]+' layer')
            map.addLayer(overlaysDict[layers[i]]);
        }
    } else {
        map.addLayer(overlaysDict["All Stairs"]);
        //map.addLayer(overlaysDict["Featured"]);
    }

    map.addLayer(searchLayer);

    // create second osm basemap layer for minimap and add minimap
    var osm_minimap = L.tileLayer(outdoorsUrl,
        {maxNativeZoom:18,maxZoom:19}
    );
    map.addControl(new L.Control.MiniMap(osm_minimap));


    // Add About button
    map.addControl(new AboutControl());


    // Add search
    var options = {
        position: 'topright',
        title: 'Search',
        placeholder: 'ex: name, stairid, materials',
        maxResultLength: 15,
        threshold: 0.3,
        showInvisibleFeatures: true,
        showResultFct: function(feature, container) {
            props = feature.properties;
            var name = L.DomUtil.create('b', null, container);
            name.addEventListener('mouseover', function(){
                //feature.layer.openPopup();
                //feature.layer.setOpacity(1);
                //window.map.addLayer(feature.layer);
                //window.map.addLayer(feature.layer.polygon);
            });
            name.addEventListener('mouseout', function(){
                //feature.layer.closePopup();
                //feature.layer.setOpacity(0);
                //window.map.removeLayer(feature.layer);
            });

            if( props.name.trim() === '' || props.name == 'N/A' ) {
                name.innerHTML = 'Stair #'+props.stairid;
            } else {
                name.innerHTML = props.name+' / #'+props.stairid;
            }

            container.appendChild(L.DomUtil.create('br', null, container));

            // var cat = props.libtype ? props.libtype : props.libcategor,
            //     info = '' + cat + ', ' + props.commune;
            var info = '';
            container.appendChild(document.createTextNode(info));
        }
    };
    var storedLayers = [];  
    var fuseSearchCtrl = L.control.fuseSearch( options );
    fuseSearchCtrl.on('show', function() {
        //console.log('show search panel');
        for(var i in overlaysDict) {
            //console.log('removing '+i)
            if( map.hasLayer(overlaysDict[i]) ) {
                storedLayers.push(overlaysDict[i]);
                map.removeLayer(overlaysDict[i]);
            }
        }
    });
    fuseSearchCtrl.on('hide', function() {
        //console.log('hide search panel');
        for(var i in storedLayers) {
            map.addLayer(storedLayers[i]);
        }
        // hide searchLayer icons
        // for( var i in searchLayer._layers ) {
        //     searchLayer._layers[i].setOpacity(0);
        // }
    });
    map.addControl( fuseSearchCtrl );

});

$(document).on("keyup", "input", function(event) {
    // If enter is pressed then hide keyboard.
    if(event.keyCode == 13) {
        $("input").blur();
    }
});
