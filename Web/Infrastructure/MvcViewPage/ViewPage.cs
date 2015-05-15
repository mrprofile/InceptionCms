using Inception.Web.Models;

namespace Inception.Web.Infrastructure.MvcViewPage
{
    public abstract class WebViewPage<TModel> : System.Web.Mvc.WebViewPage<TModel> where TModel : BasePageModel
    {
    }
}