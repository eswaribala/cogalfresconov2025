// alfresco/extension/templates/webscripts/com/example/insurance/policies.post.js
(function () {
    var DEFAULT_TARGET = "Sites/insurancedocuments/documentLibrary/Policies";

    // collect params from query/body
    var data = {
        policyNumber: args.policyNumber || null,
        holderName:   args.holderName   || null,
        policyType:   args.policyType   || null,
        startDate:    args.startDate    || null,
        endDate:      args.endDate      || null,
        targetPath:  (args.targetPath && args.targetPath.trim()) || DEFAULT_TARGET
    };

    var upload = null; // will hold multipart file field (if any)

    // IMPORTANT: formdata.fields is a Java array -> use .length
    if (typeof formdata !== "undefined" && formdata && formdata.fields) {
        for (var i = 0; i < formdata.fields.length; i++) {
            var fld = formdata.fields[i];
            if (fld.isFile && fld.name === "file") {
                upload = fld; // has .content, .filename, .mimetype
            } else if (fld.name && (data[fld.name] == null || data[fld.name] === "")) {
                data[fld.name] = fld.value; // also capture text parts from multipart
            }
        }
    }

    // validate
    if (!data.policyNumber || ("" + data.policyNumber).trim() === "") {
        status.setCode(status.STATUS_BAD_REQUEST, "policyNumber is required");
        return;
    }

    var folder = companyhome.childByNamePath(data.targetPath);
    if (!folder || !folder.isContainer) {
        status.setCode(status.STATUS_NOT_FOUND, "Target folder not found: " + data.targetPath);
        return;
    }

    // create node
    var baseName = upload ? upload.filename : "policy.pdf";
    var name = (data.policyNumber + "_" + baseName).replace(/[\/\\:]/g, "_");

    var node = folder.createFile(name);
    node.specializeType("ins:policy"); // adjust if your type id differs

    var p = node.properties;
    p["ins:ins_policyNumber"] = "" + data.policyNumber;
    if (data.holderName) p["ins:ins_holderName"] = "" + data.holderName;
    if (data.policyType) p["ins:ins_policyType"] = "" + data.policyType;
    if (data.startDate)  p["ins:ins_startDate"]  = "" + data.startDate;
    if (data.endDate)    p["ins:ins_endDate"]    = "" + data.endDate;
    node.save();

    if (upload) {
        node.properties.content.write(upload.content);
        node.mimetype = upload.mimetype ? String(upload.mimetype) : mimetypes.guessMimetype(upload.filename);
        node.properties.content.encoding = "UTF-8";
        node.save();
    }

    model.result = {
        nodeRef: String(node.nodeRef),
        name: node.name,
        path: node.displayPath + "/" + node.name,
        type: String(node.typeShort),
        policyNumber: "" + data.policyNumber
    };
})();
