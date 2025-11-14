// Add "Sponsor-Page" to the black header menu bar
(function () {
    var bar = widgetUtils.findObject(model.jsonModel, "id", "HEADER_APP_MENU_BAR");
    if (!bar) return;
    /*if (bar && bar.config && bar.config.widgets)
    {
        bar.config.widgets.push({
            name: "alfresco/header/AlfMenuItem",
            config: {
                id: "HEADER_AIKAU_POPUP",
                label: "Aikau Popup",

                // IMPORTANT: must start with 'service/'
                targetUrl: "page/dp/ws/custom/aikau/simple-popup",

                tooltip: "Open the simple popup page"
            }
        });
    }*/
    // (Optional) remove the old single item if you already added it earlier
    // bar.config.widgets = bar.config.widgets.filter(w => w.id !== "HEADER_SPONSOR_LINK");

    // Top-level menu with a dropdown
    bar.config.widgets.push({
        id: "HEADER_PRODUCTS_POPUP",
        name: "alfresco/header/AlfMenuBarPopup",
        config: {
            label: "MyProducts",                 // text shown in the black header bar
            widgets: [
                // First group (simple submenu items)
                {
                    name: "alfresco/menus/AlfMenuGroup",
                    config: {
                        widgets: [
                            {
                                name: "alfresco/menus/AlfMenuItem",
                                config: { label: "Home Page", targetUrl: "home-page" }
                            },
                            {
                                name: "alfresco/menus/AlfMenuItem",
                                config: { label: "Product Page", targetUrl: "product-page" }
                            }
                        ]
                    }
                },

                // (Optional) a nested submenu (second level)
                {
                    name: "alfresco/menus/AlfCascadingMenu",
                    config: {
                        label: "More…",
                        widgets: [
                            {
                                name: "alfresco/menus/AlfMenuItem",
                                config: { label: "About", targetUrl: "about-page" }
                            },
                            {
                                name: "alfresco/menus/AlfMenuItem",
                                config: { label: "Contact", targetUrl: "contact-page" }
                            }
                        ]
                    }
                }
            ]
        }
    });
})();
