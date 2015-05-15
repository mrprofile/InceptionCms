using Inception.Web.Models;

namespace Inception.Web.Infrastructure.MvcViewPage
{
    public abstract class WebViewPage<TModel> : System.Web.Mvc.WebViewPage<TModel> where TModel : BasePageModel
    {
        private NgConfig _ngConfig;
        public NgConfig NgConfig
        {
            get { return _ngConfig ?? (_ngConfig = new NgConfig()); }
            set { _ngConfig = value; }
        }

        protected override void InitializePage()
        {
            base.InitializePage();

            if (Model != null)
            {
                _ngConfig = Model.NgConfig;
            }
        }
    }
}