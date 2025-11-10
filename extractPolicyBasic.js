// ===== extractPolicyBasic.js =====
// Extracts only the 5 key fields from insurance document text

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
  logger.warn("No readable content in " + document.name);
  finish();
}

// Helper: regex finder
function find(pattern) {
  var m = body.match(pattern);
  return m ? m[1].trim() : "";
}

// === Extract only 5 key fields ===
var policyNumber = find(/Policy\s*Number[:\s-]*(.+)/i);
var policyType   = find(/Policy\s*Type[:\s-]*(.+)/i);
var holderName   = find(/Policy\s*Holder[:\s-]*(.+)/i);
var startDate    = find(/Start\s*Date[:\s-]*(\d{4}-\d{2}-\d{2})/i);
var endDate      = find(/End\s*Date[:\s-]*(\d{4}-\d{2}-\d{2})/i);

// Apply aspect if missing
if (!document.hasAspect("ins:policyInfo")) {
  try { document.addAspect("ins:policyInfo"); } catch (e) { logger.warn("Aspect add failed: " + e); }
}

// === Update only 5 ins:ins_* properties ===
function setProp(name, value) {
  if (value && value.length > 0) {
    document.properties[name] = value;
  }
}

setProp("ins:ins_policyNumber", policyNumber);
setProp("ins:ins_policyType", policyType);
setProp("ins:ins_holderName", holderName);
setProp("ins:ins_startDate", startDate);
setProp("ins:ins_endDate", endDate);

document.save();

logger.log("✅ Extracted basic policy info for " + document.name + ": " +
           [policyNumber, holderName, startDate, endDate].join(" | "));
