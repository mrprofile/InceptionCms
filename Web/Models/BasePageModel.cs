using Inception.Web.Infrastructure.MvcViewPage;

namespace Inception.Web.Models
{
    public class BasePageModel
    {        
        public string Title { get; set; }
        public string MetaDescription { get; set; }
        public string MetaKeywords { get; set; }

        private NgConfig _ngConfig;
        public NgConfig NgConfig
        {
            get { return _ngConfig ?? (_ngConfig = new NgConfig()); }
            set { _ngConfig = value; }
        }

        public BasePageModel()
        {
        }

        public BasePageModel(NgConfig config)
            : this()
        {
            _ngConfig = config;
        }
    }
}