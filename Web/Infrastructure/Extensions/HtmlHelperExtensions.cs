using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Web.Mvc.Html;

namespace Inception.Web.Infrastructure.Extensions
{
    public static class HtmlHelperExtensions
    {
        public static string SelectedPage(this HtmlHelper helper, string controller, string action)
        {
            string classValue = "";

            string currentController = helper.ViewContext.RouteData.GetRequiredString("controller");
            string currentAction = helper.ViewContext.RouteData.GetRequiredString("action");

            if (currentController.Equals(controller, StringComparison.OrdinalIgnoreCase) &&
                currentAction.Equals(action, StringComparison.OrdinalIgnoreCase))
            {
                classValue = "active";
            }

            return classValue;
        }

        public static MvcHtmlString SubPageMenuItem(this HtmlHelper helper, string linkText, string controller,
            string action)
        {
            return SubPageMenuItem(helper, linkText, controller, action, null, null);
        }

        public static MvcHtmlString SubPageMenuItem(this HtmlHelper helper, string linkText, string controller,
            string action, object routeValues)
        {
            return SubPageMenuItem(helper, linkText, controller, action, routeValues, null);
        }

        public static MvcHtmlString SubPageMenuItem(this HtmlHelper helper, string linkText, string controller,
            string action, object routeValues, object htmlAttributes)
        {
            return SubPageMenuItem(helper, linkText, controller, action, routeValues, htmlAttributes, null, null);
        }

        public static MvcHtmlString SubPageMenuItem(this HtmlHelper helper, string linkText, string controller,
            string action, object routeValues, object htmlAttributes, object menuItemModel, string menuItemTemplateName)
        {
            string currentController = helper.ViewContext.RouteData.GetRequiredString("controller");
            helper.ViewContext.RouteData.GetRequiredString("action");

            var objTagBuilder = new TagBuilder("li");

            IDictionary<string, object> htmlAttr = new System.Web.Routing.RouteValueDictionary(htmlAttributes);

            if (currentController.Equals(controller, StringComparison.InvariantCultureIgnoreCase))
            {
                htmlAttr["class"] = htmlAttr["class"] + " active";
            }

            objTagBuilder.MergeAttributes(htmlAttr);

            objTagBuilder.InnerHtml =
                helper.ActionLink(linkText, action, controller, routeValues, htmlAttributes).ToHtmlString();
            //objTagBuilder.InnerHtml += "<i class=\"icon-nav-up-arrow\"></i>";

            if (menuItemModel != null && !string.IsNullOrEmpty(menuItemTemplateName))
            {
                objTagBuilder.InnerHtml += helper.Partial(menuItemTemplateName, menuItemModel).ToHtmlString();
            }

            return new MvcHtmlString(objTagBuilder.ToString());
        }
    }
}
