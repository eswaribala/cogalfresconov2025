(function () {
    var PATH = "Sites/insurancedocuments/documentLibrary/Policies";
    var folder = companyhome.childByNamePath(PATH);
    if (!folder) { status.setCode(status.STATUS_NOT_FOUND, "Folder not found: " + PATH); return; }

    var res = [];
    var children = folder.children; // simple listing; add filters as needed
    for (var i = 0; i < children.length; i++) {
        var n = children[i];
        res.push({
            name: n.name,
            nodeRef: String(n.nodeRef),
            type: String(n.typeShort),
            policyNumber: n.properties["ins:ins_policyNumber"] || null
        });
    }
    model.result = res;
})();
