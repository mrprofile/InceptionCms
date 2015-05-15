using System.Web.Optimization;

namespace Inception.Web.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            /*BundleTable.EnableOptimizations = true;

            var jsBundle = new Bundle("~/bundles/js/web", new JsMinify());

            jsBundle.Include(
                "~/Content/js/vendor/modernizr-*",
                "~/Public/Components/jquery/dist/jquery.min.js",
                "~/Public/Components/bootstrap/dist/js/bootstrap.min.js"
                );
             
            var cssBundle = new Bundle("~/bundles/css/web", new CssMinify());
            cssBundle.Include(
                "~/Content/js/vendor/modernizr-*",
                "~/Content/js/vendor/jquery-1.11.2.js",
                "~/Content/js/vendor/plugins/enquire.js",
                "~/Content/js/vendor/plugins/jquery.lazyload.js",
                "~/Content/js/vendor/plugins/css-browser-selector.js",
                "~/Content/js/vendor/plugins/jquery.cookie.js",
                "~/Content/js/common/global.js",
                "~/Content/js/common/slider.js",
                "~/Content/js/common/google-ads.js",
                "~/Content/js/main.js");

            bundles.Add(jsBundle);
            bundles.Add(cssBundle);*/
        }
    }
}