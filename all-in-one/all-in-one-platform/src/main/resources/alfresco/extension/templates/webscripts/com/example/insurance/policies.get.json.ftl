{ "entries": [<#list result as r>
    { "name":"${r.name}", "nodeRef":"${r.nodeRef}", "type":"${r.type}", "policyNumber":"${r.policyNumber?if_exists}" }<#if r_has_next>,</#if>
</#list>] }