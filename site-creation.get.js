model.jsonModel = {
    widgets:[{
        id: "site-creation",
        name: "alfresco/layout/HorizontalWidgets",
        config: {
            widgets: [{
                name: "alfresco/logo/Logo",
                config: {
                    logoImageUrl: "/share/res/web-extension/images/rps-logo.png",
                    logoLinkUrl: "http://www.alfresco.com",
                    altText: "Alfresco Logo"
                }
            },{
                name: "alfresco/header/SetTitle",
                config: {
                    title: "Welcome to Life Science World!",
                    description: "This is your custom site creation page."
                }
            }]
        }
    },{
        id: "site-form",
        name: "alfresco/layout/HorizontalWidgets",
        config:{
            widgets:[{
                id: "site-form-1",
                name: "alfresco/forms/Form",
                config: {
                    okButtonLabel: "Create Site",
                    showCancelButton: true,
                    useJsonSubmit: true,
                    formSubmissionTopic: "CREATE_SITE",
                    widgets: [
                        {
                            name: "alfresco/forms/controls/TextBox",
                            config: {
                                name: "siteName",
                                label: "Site Name",
                                required: true,
                                maxLength: 50,
                                description: "Enter the name of the site.",
                                placeHolder: "My Life Science Site",
                                requirementConfig:{
                                    initialValue: "",
                                    regex: "^[a-zA-Z0-9_\\- ]+$",
                                    invalidMessage: "Site name can only contain letters, numbers, spaces, hyphens, and underscores."

                                }
                                }
                        },
                        {
                            name: "alfresco/forms/controls/DojoSelect",
                            config: {
                                fieldId: "siteVisibility",
                                name: "siteVisibility",
                                label: "Site Visibility",
                                required: true,
                                options: [
                                    { label: "Public", value: "PUBLIC" },
                                    { label: "Private", value: "PRIVATE" },
                                    { label: "Moderated", value: "MODERATED" }
                                ],
                                description: "Select the visibility level for the site.",
                                requirementConfig: {
                                    initialValue: "PUBLIC"
                                }
                            }
                        },
                        {
                            name: "alfresco/forms/controls/TextArea",
                            config: {
                                name: "address",
                                label: "Address",
                                required: false,
                                maxLength: 200,
                                description: "Provide a brief address of the site.",
                                placeHolder: "This site is for collaborative life science research.",
                                requirementConfig: {
                                    initialValue: ""
                                }
                            }
                        },
                        {
                            name: "alfresco/forms/controls/DatePicker",
                            config: {
                                name: "startDate",
                                label: "Start Date",
                                required: true,
                                description: "Select the start date for the site.",
                                requirementConfig: {
                                    initialValue: ""
                                }
                            }
                        },
                        {
                            name: "alfresco/forms/controls/DatePicker",
                            config: {
                                name: "endDate",
                                label: "End Date",
                                required: true,
                                description: "Select the end date for the site.",
                                requirementConfig: {
                                    initialValue: ""
                                }
                            }
                        },
                        {
                            name: "alfresco/forms/controls/CheckBox",
                            config: {
                                fieldId: "india",
                                name: "India",
                                label: "India",
                                description: "Check to enable India site activities.",
                                value: true,
                                requirementConfig: {
                                    initialValue: false
                                }
                            }
                        },
                        {
                            name: "alfresco/forms/controls/CheckBox",
                            config: {
                                fieldId: "singapore",
                                name: "Singapore",
                                label: "Singapore",
                                description: "Check to enable Singapore site activities.",
                                value: false,
                                requirementConfig: {
                                    initialValue: false
                                }
                            }
                        },
                        {
                            name: "alfresco/forms/controls/CheckBox",
                            config: {
                                fieldId: "thailand",
                                name: "Thailand",
                                label: "Thailand",
                                description: "Check to enable Thailand site activities.",
                                value: true,
                                requirementConfig: {
                                    initialValue: false
                                }
                            }
                        }


                        ]

                }

            }]
        }

    }]


};