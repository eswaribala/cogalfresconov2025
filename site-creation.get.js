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
                name: "alfresco/header/PageTitle",
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


                        ]

                }

            }]
        }

    }]


};