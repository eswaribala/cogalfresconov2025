define(["dojo/_base/declare", "alfresco/core/Core"], function(declare, Core) {
    return declare([Core], {
        constructor: function() {
            this.alfSubscribe("MY_BUTTON_CLICK", this.onButtonClick);
        },

        onButtonClick: function(payload) {
            alert("Aikau Button Clicked! Message: " + payload.message);
        }
    });
});
