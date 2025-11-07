/**
 * extractPolicyNumber (no new files, no renditions)
 * - Works for PDFs that contain selectable text (not scans).
 * - Requires a working PDF->text transformer (Tika/Transform Service or local).
 *
 * Examples matched:
 *   "Policy Number HP-001234"
 *   "Policy No: AB-123456"
 *   standalone "XY-654321"
 */
(function () {
  // ---- configure patterns you accept ----
  var PATTERNS = [
    /Policy\s*Number[:\s\-]*([A-Z]{2}-\d{6})/i,
    /Policy\s*No(?:\.|umber)?[:\s\-]*([A-Z]{2}-\d{6})/i,
    /\b([A-Z]{2}-\d{6})\b/
  ];

  function readPdfAsText(doc) {
    try {
      // If already text/*, return directly
      if ((doc.mimetype || "").indexOf("text/") === 0) {
        return String(doc.content || "");
      }
      // In-memory transform; returns a transient doc (not persisted)
      var txt = doc.transformDocument("text/plain");
      if (txt && txt.content) return String(txt.content);
    } catch (e) {
      logger.warn("PDF->text transform failed for " + doc.name + ": " + e);
    }
    return "";
  }

  function matchFirst(regexes, text) {
    for (var i = 0; i < regexes.length; i++) {
      var m = text.match(regexes[i]);
      if (m && m[1]) return m[1].toUpperCase();
    }
    return null;
  }

  if (!document || !document.nodeRef) {
    logger.warn("No document in scope"); return;
  }

  // Only handle PDFs or text-like content
  var mt = String(document.mimetype || "");
  if (!(mt === "application/pdf" || mt.indexOf("text/") === 0)) return;

  // Skip if policy number already present
  if (document.properties["ins:ins_policyNumber"]) {
    logger.log("ins:ins_policyNumber already set for " + document.name); return;
  }

  // Try from PDF text (in-memory)
  var text = readPdfAsText(document);
  var value = text ? matchFirst(PATTERNS, text) : null;

  // Lightweight fallback: try filename if text failed
  if (!value) {
    var nm = document.name || "";
    var m = nm.match(/\b([A-Z]{2}-\d{6})\b/i);
    if (m) value = m[1].toUpperCase();
  }

  if (value) {
    document.properties["ins:ins_policyNumber"] = value;
    document.save();
    logger.log("Set ins:ins_policyNumber=" + value + " for " + document.name);
  } else {
    logger.log("No policy number found in " + document.name);
  }
})();
