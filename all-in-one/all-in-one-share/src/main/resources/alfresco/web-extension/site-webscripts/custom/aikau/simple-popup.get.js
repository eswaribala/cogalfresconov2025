// simple-popup.get.js
//
// This builds an Aikau JSON model for a simple page:
//
//  - one button: "Open Popup"
//  - when clicked: shows a dialog with some text and a Close button

// (Optional: if you want header/footer etc. from Share, you could import
//  header helpers and wrap this jsonModel in a page template, but for a
//  minimal example we just return the content region.)

model.jsonModel = {
    services: [
        // DialogService is required for ALF_CREATE_DIALOG_REQUEST
        "alfresco/services/DialogService"
    ],

    widgets: [
        {
            // Use a simple full-width layout
            name: "alfresco/layout/ClassicWindow",
            config: {
                title: "Simple Aikau Popup Page",
                widgets: [
                    {
                        name: "alfresco/html/Label",
                        config: {
                            label: "Click the button below to open the popup dialog."
                        }
                    },
                    {
                        name: "alfresco/buttons/AlfButton",
                        config: {
                            label: "Open Popup",
                            iconClass: "alf-whiteinfo",

                            // This tells DialogService to create a dialog
                            publishTopic: "ALF_CREATE_DIALOG_REQUEST",
                            publishPayload: {
                                dialogId: "SIMPLE_POPUP_DIALOG",

                                // Title for the popup window
                                options: {
                                    title: "My Simple Aikau Popup"
                                },

                                // Content widgets inside the dialog
                                widgetsContent: [
                                    {
                                        name: "alfresco/html/Label",
                                        config: {
                                            label: "Hello from the popup dialog!"
                                        }
                                    },
                                    {
                                        name: "alfresco/html/Label",
                                        config: {
                                            label: "You can add forms, tables, buttons and any other Aikau widgets here."
                                        }
                                    }
                                ],

                                // Buttons at the bottom of the dialog
                                widgetsButtons: [
                                    {
                                        name: "alfresco/buttons/AlfButton",
                                        config: {
                                            label: "Close",
                                            publishTopic: "ALF_CLOSE_DIALOG",
                                            publishPayload: {
                                                dialogId: "SIMPLE_POPUP_DIALOG"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    ]
};
