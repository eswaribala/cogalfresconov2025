model.jsonModel = {
    services: [
        "tutorials/widgets/AlertService"

    ],

    widgets: [
        {
            name: "alfresco/menus/AlfMenuBar",
            config: {
                id: "MainMenuBar",
                widgets: [
                    {
                        name: "alfresco/menus/AlfMenuBarItem",
                        config: {
                            label: "Home",
                            publishTopic: "SHOW_HOME"
                        }
                    },
                    {
                        name: "alfresco/menus/AlfMenuBarItem",
                        config: {
                            label: "Gallery",
                            publishTopic: "SHOW_GALLERY"
                        }
                    },
                    {
                        name: "alfresco/menus/AlfMenuBarItem",
                        config: {
                            label: "Map",
                            publishTopic: "SHOW_MAP"
                        }
                    }
                ]
            }
        },

        {
            id: "site-creation",
            name: "alfresco/layout/HorizontalWidgets",
            config: {
                widgets: [
                    {
                        name: "alfresco/logo/Logo",
                        config: {
                            logoImageUrl: "share/res/web-extension/images/rps-logo.png",
                            logoLinkUrl: "http://www.alfresco.com",
                            altText: "Alfresco Logo"
                        }
                    },
                    {
                        name: "alfresco/header/SetTitle",
                        config: {
                            title: "Welcome to Life Science World!",
                            description: "This is your custom site creation page."
                        }
                    }
                ]
            }
        },

        {
            id: "site-form",
            name: "alfresco/layout/HorizontalWidgets",
            config: {
                widgets: [

                    /* -------------------------------------
                       LEFT COLUMN : FORM     (60%)
                       ------------------------------------- */
                    {
                        name: "alfresco/layout/VerticalWidgets",
                        config: {
                            widthPc: 60,
                            style: "margin-left: 120px; margin-top: 20px;font-family: Arial, sans-serif;font-size: 14px;",
                            widgets: [
                                {
                                    id: "site-form-1",
                                    name: "alfresco/forms/Form",
                                    config: {
                                        additionalCssClasses: "ls-site-form",
                                        okButtonLabel: "Create Site",
                                        showCancelButton: true,

                                        okButtonPublishTopic: "LS_SITE_FORM_SUBMIT",
                                        okButtonPublishGlobal: true,
                                        okButtonPublishPayload: {
                                            formData: "{jsonFormData}"
                                        },

                                        widgets: [
                                            {
                                                name: "alfresco/forms/controls/TextBox",
                                                config: {
                                                    name: "siteName",
                                                    label: "Site Name",
                                                    required: true,
                                                    maxLength: 50,
                                                    description: "Enter the name of the site.",
                                                    placeHolder: "My Life Science Site"
                                                }
                                            },
                                            {
                                                name: "alfresco/forms/controls/DojoSelect",
                                                config: {
                                                    fieldId: "siteVisibility",
                                                    name: "siteVisibility",
                                                    label: "Site Visibility",
                                                    required: true,
                                                    optionsConfig: {
                                                        fixed: [
                                                            { label: "Public", value: "PUBLIC" },
                                                            { label: "Private", value: "PRIVATE" },
                                                            { label: "Moderated", value: "MODERATED" }
                                                        ]
                                                    },
                                                    value: "PUBLIC"
                                                }
                                            },
                                            {
                                                name: "alfresco/forms/controls/TextArea",
                                                config: {
                                                    name: "address",
                                                    label: "Address",
                                                    description: "Provide a brief address of the site."
                                                }
                                            },
                                            {
                                                name: "alfresco/forms/controls/DateTextBox",
                                                config: {
                                                    name: "startDate",
                                                    label: "Start Date",
                                                    required: true
                                                }
                                            },
                                            {
                                                name: "alfresco/forms/controls/DateTextBox",
                                                config: {
                                                    name: "endDate",
                                                    label: "End Date"
                                                }
                                            },
                                            {
                                                name: "alfresco/forms/controls/CheckBox",
                                                config: {
                                                    fieldId: "india",
                                                    name: "India",
                                                    label: "India",
                                                    value: true
                                                }
                                            },
                                            {
                                                name: "alfresco/forms/controls/CheckBox",
                                                config: {
                                                    fieldId: "singapore",
                                                    name: "Singapore",
                                                    label: "Singapore",
                                                    value: false
                                                }
                                            },
                                            {
                                                name: "alfresco/forms/controls/CheckBox",
                                                config: {
                                                    fieldId: "thailand",
                                                    name: "Thailand",
                                                    label: "Thailand",
                                                    value: true
                                                }
                                            },
                                            {
                                                id: "status",
                                                name: "alfresco/forms/controls/RadioButtons",
                                                config: {
                                                    fieldId: "Status",
                                                    name: "status",
                                                    value: "INACTIVE",
                                                    label: "Status",
                                                    description: "Is it active?",
                                                    optionsConfig: {
                                                        fixed: [
                                                            { label: "ACTIVE", value: "ACTIVE"},
                                                            { label: "INACTIVE", value: "INACTIVE"}
                                                        ]
                                                    }
                                                }
                                            },
                                            {
                                                name: "alfresco/forms/controls/FilePicker",
                                                config: {
                                                    fieldId: "siteDocuments",
                                                    name: "prop_site:siteDocuments",
                                                    label: "Related Documents",
                                                    description: "Attach multiple documents for this site.",
                                                    multiple: true,                   // allow several files
                                                    uploadDirectory: "/Company Home/Site Documents",
                                                    rootNode: "alfresco://company/home"
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },

                    /* -------------------------------------
                       RIGHT COLUMN : GEO VIEWER (40%)
                       ------------------------------------- */
                    {
                        name: "alfresco/layout/VerticalWidgets",
                        config: {
                            widthPc: 40,
                            style: "padding: 20px;",
                            widgets: [

                                /********************************************
                                 * IMAGE VIEWER DIALOG (Click thumbnail → show)
                                 ********************************************/
                                {
                                    name: "alfresco/dialogs/AlfDialog",
                                    config: {
                                        dialogId: "ImageViewerDialog",
                                        title: "Image Viewer",
                                        subscribeTopic: "SHOW_IMAGE_VIEWER",
                                        destroyOnHide: false,
                                        width: "800px",

                                        widgetsContent: [
                                            {
                                                name: "alfresco/preview/Preview",
                                                config: {
                                                    nodeRefProperty: "currentItem.nodeRef",
                                                    showChrome: true,
                                                    width: "100%",
                                                    height: "500px"
                                                }
                                            }
                                        ],

                                        widgetsButtons: [
                                            {
                                                name: "alfresco/buttons/AlfButton",
                                                config: {
                                                    label: "Close",
                                                    publishTopic: "ALF_CLOSE_DIALOG"
                                                }
                                            }
                                        ]
                                    }
                                },

                                /********************************************
                                 * LOGO PICKER
                                 ********************************************/
                                {
                                    name: "alfresco/forms/controls/Picker",
                                    config: {
                                        fieldId: "siteLogo",
                                        name: "prop_site:siteLogo",
                                        label: "Site Logo",
                                        description: "Pick a logo from Data Dictionary / Site Images",
                                        mandatory: false,

                                        picker: {
                                            type: "cm:content",
                                            multipleSelectMode: false,
                                            rootNode: "alfresco://company/home",
                                            startLocation: "/Company Home/Data Dictionary/Site Images"
                                        }
                                    }
                                },

                                {
                                    name: "alfresco/html/Label",
                                    config: {
                                        label: "Selected logo will be stored in the 'siteLogo' field."
                                    }
                                },

                                /********************************************
                                 * GEO WIDGET + GALLERY
                                 ********************************************/
                                {
                                    name: "alfresco/layout/ClassicWindow",
                                    config: {
                                        title: "Site Location",
                                        widgets: [

                                            // MAP WIDGET
                                            {
                                                name: "tutorials/widgets/GeoWidget",
                                                config: {
                                                    height: "350px",
                                                    width: "100%",
                                                    center: { lat: 13.0827, lon: 80.2707 },
                                                    zoom: 13,
                                                    markers: [
                                                        { lat: 13.0827, lon: 80.2707, title: "Chennai", info: "Head Office" }
                                                    ]
                                                }
                                            },

                                            // IMAGE GALLERY
                                            {
                                                name: "alfresco/lists/AlfList",
                                                config: {
                                                    style: "margin-top:10px;",
                                                    loadDataPublishTopic: "LOAD_SITE_IMAGES",

                                                    widgets: [
                                                        {
                                                            name: "alfresco/documentlibrary/views/AlfGalleryView",
                                                            config: {
                                                                widgets: [
                                                                    {
                                                                        name: "alfresco/lists/views/layouts/Row",
                                                                        config: {
                                                                            widgets: [
                                                                                {
                                                                                    name: "alfresco/lists/views/layouts/Cell",
                                                                                    config: {
                                                                                        widgets: [
                                                                                            {
                                                                                                // THUMBNAIL (Click → SHOW_IMAGE_VIEWER)
                                                                                                name: "alfresco/renderers/Thumbnail",
                                                                                                config: {
                                                                                                    publishTopic: "SHOW_IMAGE_VIEWER",
                                                                                                    publishPayloadType: "CURRENT_ITEM"
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                name: "alfresco/renderers/Property",
                                                                                                config: {
                                                                                                    propertyToRender: "displayName",
                                                                                                    label: "Name:"
                                                                                                }
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                        }
                                                    ]
                                                }
                                            },

                                            // SEARCH SERVICE → FEEDS GALLERY
                                            {
                                                name: "alfresco/services/SearchService",
                                                config: {
                                                    subscriptions: [
                                                        {
                                                            topic: "LOAD_SITE_IMAGES",
                                                            payload: {
                                                                query: {
                                                                    language: "fts-alfresco",
                                                                    query: 'PATH:"/app:company_home/app:dictionary//*"'
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                },

                                /********************************************
                                 * CONFIRM BUTTON → OPEN PROMPT
                                 ********************************************/
                                {
                                    name: "alfresco/buttons/AlfButton",
                                    config: {
                                        label: "Confirm Site Location",
                                        iconClass: "alf-confirm-icon",
                                        publishTopic: "SHOW_SITE_LOCATION_PROMPT"
                                    }
                                },

                                /********************************************
                                 * PROMPT DIALOG (ONLY ONE!)
                                 ********************************************/
                                {
                                    name: "alfresco/dialogs/AlfDialog",
                                    config: {
                                        dialogId: "SiteLocationPrompt",
                                        title: "Confirm Site Location",
                                        subscribeTopic: "SHOW_SITE_LOCATION_PROMPT",
                                        destroyOnHide: false,
                                        width: "400px",

                                        widgetsContent: [
                                            {
                                                name: "alfresco/html/Label",
                                                config: {
                                                    label: "Do you want to use this site location and selected images?"
                                                }
                                            }
                                        ],

                                        widgetsButtons: [
                                            {
                                                name: "alfresco/buttons/AlfButton",
                                                config: {
                                                    label: "Yes",
                                                    publishTopic: "SITE_LOCATION_CONFIRMED"
                                                }
                                            },
                                            {
                                                name: "alfresco/buttons/AlfButton",
                                                config: {
                                                    label: "Cancel",
                                                    publishTopic: "ALF_CLOSE_DIALOG"
                                                }
                                            }
                                        ]
                                    }
                                },

                                /********************************************
                                 * STATUS LABEL (UPDATES ON CONFIRM)
                                 ********************************************/
                                {
                                    name: "alfresco/html/Label",
                                    config: {
                                        label: "Status: not confirmed",
                                        subscriptions: [
                                            {
                                                topic: "SITE_LOCATION_CONFIRMED",
                                                handler: {
                                                    name: "onSiteLocationConfirmed"
                                                }
                                            }
                                        ],
                                        onSiteLocationConfirmed: function() {
                                            this.set("label", "Status: Site location confirmed ✔");
                                        }
                                    }
                                }
                            ]
                        }
                    }


                ]
            }
        }
    ]
};