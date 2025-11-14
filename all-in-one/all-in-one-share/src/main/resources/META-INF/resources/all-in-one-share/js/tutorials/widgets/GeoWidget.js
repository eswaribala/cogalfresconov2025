define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/dom-style",
    "alfresco/core/Core"
], function(declare, lang, domConstruct, domStyle, Core) {

    return declare([Core], {

        // Configurable from JSON model
        height: "350px",
        width: "100%",
        center: null,   // { lat: ..., lon: ... }
        zoom: 8,
        markers: null,  // [ { lat, lon, title, info } ]

        // Internal
        _leafletLoaded: false,
        _leafletLoading: false,
        map: null,
        mapNode: null,

        constructor: function GeoWidget(args) {
            lang.mixin(this, args);
            this.center = this.center || { lat: 13.0827, lon: 80.2707 };
            this.markers = this.markers || [];
        },

        postCreate: function() {
            this.inherited(arguments);

            // Create map container div inside this.domNode
            this.mapNode = domConstruct.create("div", {}, this.domNode);
            domStyle.set(this.mapNode, {
                height: this.height,
                width: this.width,
                border: "1px solid #ccc"
            });

            // Load Leaflet, then init map
            this._ensureLeaflet(lang.hitch(this, this._initMap));
        },

        /**
         * Ensures Leaflet JS and CSS are loaded (from CDN) only once.
         */
        _ensureLeaflet: function(callback) {
            if (this._leafletLoaded && window.L) {
                callback();
                return;
            }

            if (this._leafletLoading) {
                // Wait and retry
                var self = this;
                var waitId = setInterval(function() {
                    if (self._leafletLoaded && window.L) {
                        clearInterval(waitId);
                        callback();
                    }
                }, 200);
                return;
            }

            this._leafletLoading = true;

            // Inject Leaflet CSS
            var leafletCss = document.createElement("link");
            leafletCss.rel = "stylesheet";
            leafletCss.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            leafletCss.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
            leafletCss.crossOrigin = "";
            document.head.appendChild(leafletCss);

            // Inject Leaflet JS
            var leafletJs = document.createElement("script");
            leafletJs.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
            leafletJs.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
            leafletJs.crossOrigin = "";

            var self = this;
            leafletJs.onload = function() {
                self._leafletLoaded = true;
                self._leafletLoading = false;
                callback();
            };
            leafletJs.onerror = function() {
                self._leafletLoading = false;
                console.error("Failed to load Leaflet JS");
            };

            document.head.appendChild(leafletJs);
        },

        /**
         * Initializes the Leaflet map and markers.
         */
        _initMap: function() {
            if (!window.L) {
                console.error("Leaflet not available");
                return;
            }

            // Create map
            this.map = L.map(this.mapNode).setView(
                [this.center.lat, this.center.lon],
                this.zoom
            );

            // Tile layer (OpenStreetMap)
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            }).addTo(this.map);

            // Add markers
            if (this.markers && this.markers.length) {
                for (var i = 0; i < this.markers.length; i++) {
                    var m = this.markers[i];
                    var marker = L.marker([m.lat, m.lon]).addTo(this.map);
                    if (m.title) {
                        marker.bindPopup("<b>" + m.title + "</b><br/>" + (m.info || ""));
                    }
                }
            }
        },

        /**
         * Optional: allow external topic to update map center/marker.
         * E.g. subscribe to "LS_UPDATE_MAP" and re-center map.
         */
        onUpdateLocation: function(payload) {
            if (!this.map || !payload) return;

            var lat = payload.lat || this.center.lat;
            var lon = payload.lon || this.center.lon;
            this.map.setView([lat, lon], payload.zoom || this.zoom);
        }
    });
});
