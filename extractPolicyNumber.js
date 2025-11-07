// ------ CONFIGURE YOUR REGEX HERE ------
var patterns = [
  /Policy\s*Number[:\s-]*([A-Z]{2}-\d{6})/i,
  /Policy\s*No[:\s-]*([A-Z]{2}-\d{6})/i,
  /\b([A-Z]{2}-\d{6})\b/
];

// Skip if property already set
if (document.properties["ins:ins_policyNumber"]) {
  logger.log("ins:policyNumber already present for " + document.name + "; skipping.");
  finish();
}

function readAsText(doc) {
  try {
    if (doc.mimetype && doc.mimetype.indexOf("text/") === 0) {
      return String(doc.content || "");
    }
    var txt = doc.transformDocument("text/plain");
    if (txt && txt.content) return String(txt.content);
  } catch (e) {
    logger.warn("Transform to text failed for " + doc.name + ": " + e);
  }
  return "";
}

var body = readAsText(document);
if (!body || body.length === 0) {
  logger.warn("No text content available for " + document.name + " (cannot extract policy number).");
  finish();
}

function firstMatch(regexes, text) {
  for (var i = 0; i < regexes.length; i++) {
    var m = text.match(regexes[i]);
    if (m && m[1]) return m[1].toUpperCase();
  }
  return null;
}

var value = firstMatch(patterns, body);

if (value) {
  document.properties["ins:ins_policyNumber"] = value;
  document.save();
  logger.log("Set ins:ins_policyNumber=" + value + " for " + document.name);
} else {
  logger.log("No policy number found in " + document.name);
}
