define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "alfresco/core/Core",
    "alfresco/core/NotificationUtils"
], function(declare, lang, Core, NotificationUtils) {

    return declare([Core], {

        constructor: function AlertService(args) {
            lang.mixin(this, args);

            // Listen for our custom topic published by the form button
            this.alfSubscribe("LS_SITE_FORM_SUBMIT", lang.hitch(this, this.onFormSubmit));
        },

        onFormSubmit: function(payload) {
            console.log("RAW PAYLOAD RECEIVED:", payload);

            // Extract form data (payload contains the widget values)
            var data = payload && payload.widgets ? payload.widgets : payload;

            // Build readable message
            var msg =
                "Site Name: " + (data.siteName || "") + "\n" +
                "Visibility: " + (data.siteVisibility || "") + "\n" +
                "Address: " + (data.address || "") + "\n" +
                "Start Date: " + (data.startDate || "") + "\n" +
                "End Date: " + (data.endDate || "") + "\n" +
                "India: " + (data.India || false) + "\n" +
                "Singapore: " + (data.Singapore || false) + "\n" +
                "Thailand: " + (data.Thailand || false) + "\n" +
                "Status:" + (data.status || "");

            // Show browser alert with form data
            alert("Form Submitted:\n\n" + msg);

            // Aikau toast notification
            NotificationUtils.displayMessage({
                message: "Site created: " + (data.siteName || ""),
                duration: 5,
                type: "info"
            });

            console.log("FORM DATA PROCESSED:", data);
        }
    });
});
