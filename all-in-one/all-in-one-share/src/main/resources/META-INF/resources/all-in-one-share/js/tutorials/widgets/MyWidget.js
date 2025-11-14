define(["dojo/_base/declare", "dijit/_WidgetBase", "alfresco/core/Core"],
    function(declare, _Widget, Core) {
        console.log("Widget file loaded");
        return declare([_Widget, Core], {
            postCreate: function() {
                this.inherited(arguments);
                console.log("postCreate called");
                alert("Rocking!!!");
            }
        });
    });