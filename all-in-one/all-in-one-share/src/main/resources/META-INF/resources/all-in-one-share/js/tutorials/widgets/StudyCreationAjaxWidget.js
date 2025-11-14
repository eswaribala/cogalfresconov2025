define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "alfresco/core/Core",
        "alfresco/core/CoreXhr",
        "dojo/dom-construct",
        "dojo/_base/array",
        "dijit/_TemplatedMixin",
        "dojo/text!./templates/StudyCreationAjaxWidget.html"
    ],
    function(declare, _Widget, Core, AlfCoreXhr, domConstruct, array, _Templated, template) {
        return declare([_Widget, Core, AlfCoreXhr, _Templated], {
            templateString: template,
            cssRequirements: [{cssFile:"./css/AjaxWidget.css"}],
            i18nRequirements: [ {i18nFile: "./i18n/AjaxWidget.properties"} ],
            buildRendering: function example_widgets_AjaxWidget__buildRendering() {
                this.widgetTitle = this.message('widgetTitle');
                this.name = this.message('name');
                this.email = this.message('email');
                this.inherited(arguments);
            },
            postCreate: function example_widgets_AjaxWidget__postCreate() {
                alert("reaching the widget");
               // var url = Alfresco.constants.PROXY_URI + "slingshot/doclib/treenode/node/alfresco/company/home";
                var url="https://jsonplaceholder.typicode.com/users"
                this.serviceXhr({url : url,
                    method: "GET",
                    successCallback: this._onSuccessCallback,
                    callbackScope: this});
            },
            _onSuccessCallback: function example_widgets_AjaxWidget__onSuccessCallback(response, config) {
                alert("on success callback reached");
               // alert(response);
               // console.log(response);
                var parentNode = this.containerNode;
                console.log(parentNode);
                response.forEach(function(d) {
                    console.log(d);
                    var row = domConstruct.create( "tr", {}, parentNode );
                    domConstruct.create( "td", { innerHTML: d.username }, row);
                    domConstruct.create( "td", { innerHTML: d.email }, row);
                    console.log(row);
                })

               /* if (response.totalResults != undefined && response.totalResults > 0) {
                    var parentNode = this.containerNode;
                    array.forEach( response.items, function(item) {
                        var row = domConstruct.create( "tr", {}, parentNode );
                        domConstruct.create( "td", { innerHTML: item.name }, row);
                        domConstruct.create( "td", { innerHTML: item.description }, row);
                    });
                }*/
            }
        });
    });