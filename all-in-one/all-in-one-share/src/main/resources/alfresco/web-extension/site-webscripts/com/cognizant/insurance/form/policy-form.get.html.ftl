<div id="policy-form-widget" class="policy-form-widget">
    <h3>${msg("policy.form.title")! "Create Policy"}</h3>

    <form id="policyForm" action="#" method="post" accept-charset="utf-8">
        <div class="yui-g">
            <div class="yui-u first">
                <label for="pf-policyNumber">Policy Number *</label><br/>
                <input type="text" id="pf-policyNumber" name="policyNumber" />
            </div>
            <div class="yui-u">
                <label for="pf-holderName">Holder Name</label><br/>
                <input type="text" id="pf-holderName" name="holderName" />
            </div>
        </div>
        <div style="margin-top:12px;">
            <button id="pf-submit" class="yui-button yui-push-button" type="submit">
                ${msg("policy.form.submit")!"Submit"}
            </button>
        </div>
    </form>
</div>

<script type="text/javascript">
    //<![CDATA[
    (function() {
        if (!window.Alfresco || !window.YAHOO) { return; }

        var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event;
        var formEl = Dom.get("policyForm");
        var serviceUrl = "http://localhost:8080/alfresco/service/insurance/policy";

        Event.on(formEl, "submit", function (e) {
            Event.preventDefault(e);

            var dataObj = {
                policyNumber: Dom.get("pf-policyNumber").value,
                holderName:   Dom.get("pf-holderName").value
            };

            if (!dataObj.policyNumber) {
                Alfresco.util.PopupManager.displayMessage({ text: "policyNumber is required" });
                return;
            }

            Alfresco.util.Ajax.jsonPost({
                url: serviceUrl,
                dataObj: dataObj,             // CSRF added automatically
                successCallback: {
                    fn: function(res) {
                        var msg = (res.json && res.json.res && res.json.res.ok)
                            ? "Saved: " + res.json.res.name
                            : "Saved";
                        Alfresco.util.PopupManager.displayMessage({ text: msg });
                        // Optional: clear form
                        Dom.get("pf-policyNumber").value = "";
                        Dom.get("pf-holderName").value = "";
                    },
                    scope: this
                },
                failureCallback: {
                    fn: function(res) {
                        var err = (res.json && (res.json.message || (res.json.res && res.json.res.message))) || "Save failed";
                        Alfresco.util.PopupManager.displayMessage({ text: err });
                    },
                    scope: this
                }
            });
        });
    })();
    //]]>
</script>
