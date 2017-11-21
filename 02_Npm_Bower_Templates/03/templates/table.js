(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['table'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    "
    + container.escapeExpression(((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"data","hash":{},"data":data}) : helper)))
    + "\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, buffer =
  "<table cellspacing=\"0\">\r\n  <tr class=\"odd\">\r\n    <th>Poster</th>\r\n    <th>Title</th>\r\n    <th>Votes</th>\r\n    <th>Release Date</th>\r\n    <th>Overview</th>\r\n  </tr>\r\n";
  stack1 = ((helper = (helper = helpers.tableHelper || (depth0 != null ? depth0.tableHelper : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"tableHelper","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),options) : helper));
  if (!helpers.tableHelper) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</table>\r\n";
},"useData":true});
})();
