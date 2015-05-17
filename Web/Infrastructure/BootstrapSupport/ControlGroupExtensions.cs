using System;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;

namespace Inception.Web.Infrastructure.BootstrapSupport
{
    public static class ControlGroupExtensions
    {
        public static IHtmlString BeginControlGroupFor<T>(this HtmlHelper<T> html,
                                                              Expression<Func<T, object>> modelProperty)
        {
            var controlGroupWrapper = new TagBuilder("div");
            controlGroupWrapper.AddCssClass("control-group");
            var partialFieldName = ExpressionHelper.GetExpressionText(modelProperty);
            var fullHtmlFieldName = html.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(partialFieldName);
            if (!html.ViewData.ModelState.IsValidField(fullHtmlFieldName))
            {
                controlGroupWrapper.AddCssClass("error");
            }
            var openingTag = controlGroupWrapper.ToString(TagRenderMode.StartTag);
            return MvcHtmlString.Create(openingTag);
        }

        public static IHtmlString BeginControlGroupFor<T>(this HtmlHelper<T> html,
                                                  string propertyName)
        {
            var controlGroupWrapper = new TagBuilder("div");
            controlGroupWrapper.AddCssClass("control-group");
            var partialFieldName = propertyName;
            var fullHtmlFieldName = html.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(partialFieldName);
            if (!html.ViewData.ModelState.IsValidField(fullHtmlFieldName))
            {
                controlGroupWrapper.AddCssClass("error");
            }
            var openingTag = controlGroupWrapper.ToString(TagRenderMode.StartTag);
            return MvcHtmlString.Create(openingTag);
        }

        public static MvcHtmlString GetValidationMessage(this HtmlHelper htmlHelper, string propertyName, string cssClass)
        {
            var partialFieldName = propertyName;
            var fullHtmlFieldName = htmlHelper.ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(partialFieldName);

            if (!htmlHelper.ViewData.ModelState.IsValidField(fullHtmlFieldName))
            {
                System.Text.StringBuilder sb = new System.Text.StringBuilder();
                int errorCount = htmlHelper.ViewData.ModelState[propertyName].Errors.Count;

                for (int i = 0; i < errorCount; i++)
                {
                    var controlGroupWrapper = new TagBuilder("span");
                    controlGroupWrapper.AddCssClass("help-block error");
                    if(!String.IsNullOrEmpty(cssClass)) {
                        controlGroupWrapper.AddCssClass(cssClass);
                    }
                    controlGroupWrapper.Attributes.Add("for", propertyName);
                    string error = htmlHelper.ViewData.ModelState[propertyName].Errors[i].ErrorMessage;
                    controlGroupWrapper.SetInnerText(error);
                    sb.Append(controlGroupWrapper.ToString());
                }
                //var controlGroupWrapper = new TagBuilder("span");
                //controlGroupWrapper.AddCssClass("help-block error");
                //controlGroupWrapper.Attributes.Add("for", propertyName);
                //string error = htmlHelper.ViewData.ModelState[propertyName].Errors.Count > 1 ? htmlHelper.ViewData.ModelState[propertyName].Errors[1].ErrorMessage : htmlHelper.ViewData.ModelState[propertyName].Errors[0].ErrorMessage;
                //controlGroupWrapper.SetInnerText(error);

                return MvcHtmlString.Create(sb.ToString());
            }

            return MvcHtmlString.Create("");
        }

        public static MvcHtmlString GetValidationMessage(this HtmlHelper htmlHelper, string propertyName)
        {
            return GetValidationMessage(htmlHelper, propertyName, "");            
        }

        public static IHtmlString EndControlGroup(this HtmlHelper html)
        {
            return MvcHtmlString.Create("</div>");
        }
    }
}
