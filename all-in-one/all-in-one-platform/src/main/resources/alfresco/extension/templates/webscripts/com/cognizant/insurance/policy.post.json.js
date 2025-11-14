(function () {
    function bad(msg, code) {
        status.code = code || 400;
        status.message = msg;
        status.redirect = false;
        model.res = { ok:false, message: msg };
    }
    if (!json) return bad("JSON body required");
    if (!json.has("policyNumber")) return bad("policyNumber is required");

    var folder = companyhome.childByNamePath("Company Home/Policies") || companyhome.createFolder("Policies");
    var name = String(json.get("policyNumber")) + ".txt";
    var node = folder.childByNamePath(name) || folder.createFile(name);

    // Optional model mapping (adjust to your model)
    try { node.specializeType("ins:policy"); } catch (e) {} // ignore if already specialized
    if (json.has("policyNumber")) node.properties["ins:ins_policyNumber"] = String(json.get("policyNumber"));
    if (json.has("holderName"))   node.properties["ins:ins_holderName"]   = String(json.get("holderName"));
    node.content = "Policy: " + String(json.get("policyNumber"));
    node.save();

    model.res = { ok:true, nodeRef: String(node.nodeRef), name: node.name };
})();
