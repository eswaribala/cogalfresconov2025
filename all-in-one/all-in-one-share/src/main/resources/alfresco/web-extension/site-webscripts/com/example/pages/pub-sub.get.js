model.jsonModel = {
    widgets: [{
        id: "SET_PAGE_TITLE",
        name: "alfresco/header/SetTitle",
        config: {
            title: "Pub/sub example"
        }
    },
        {
            name: "alfresco/layout/HorizontalWidgets",
            config: {
                widgetWidth: 50,
                widgets: [
                    {
                        name: "tutorials/widgets/InputWidget"
                    },
                    {
                        name: "tutorials/widgets/RenderWidget"
                    }
                ]
            }
        }]
};