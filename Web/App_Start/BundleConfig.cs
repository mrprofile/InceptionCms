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

            bundles.Add(new Bundle("~/bundles/angularjs").Include(
                 "~/Content/components/jquery/dist/jquery.js",
                "~/Content/components/jquery-ui/jquery-ui.js",
                "~/Content/components/angular/angular.js",
                "~/Content/components/angular-aria/angular-aria.js",
                "~/Content/components/angular-material/angular-material.js",
                "~/Content/Components/angular-route/angular-route.js",
                "~/Content/components/angular-bootstrap/ui-bootstrap-tpls.js",
                "~/Content/components/angular-sanitize/angular-sanitize.js",
                "~/Content/components/angular-cookies/angular-cookies.js",
                "~/Content/components/angular-animate/angular-animate.min.js",
                "~/Content/components/moment/moment.js",
                "~/Content/components/angularjs-toaster/toaster.js",
                "~/Content/components/angular-ui-select/dist/select.js",
                "~/Content/components/angular-ui-sortable/sortable.js",
                "~/Content/components/ng-mfb/src/mfb-directive.js",
                "~/Content/components/xtiancapil-angular-bootstrap-datetimepicker/src/js/datetimepicker.js"
                ));


            bundles.Add(new Bundle("~/bundles/esqtv-common").Include(
                "~/App/Common/App.js",
                "~/App/Common/Config.js",
                "~/App/Common/Interceptors/*.js",                
                "~/App/Common/Services/*.js",
                "~/App/Common/Directives/*.js",
                "~/App/Common/Controllers/*.js"));


            bundles.Add(new Bundle("~/bundles/esqtv-pages").Include(
                "~/App/Pages/App.js",
                "~/App/Pages/Config.js",
                "~/App/Pages/Directives/*.js",
                "~/App/Pages/Controllers/*.js"));

            bundles.Add(new Bundle("~/bundles/esqtv-home").Include(
                "~/App/Home/App.js",
                "~/App/Home/Config.js",
                "~/App/Home/Controllers/*.js"));

            bundles.Add(new Bundle("~/bundles/esqtv-video").Include(
                "~/App/Video/App.js",
                "~/App/Video/Config.js",
                "~/App/Video/Controllers/*.js"));

            bundles.Add(new Bundle("~/bundles/esqtv-slider").Include(
                "~/App/Slider/App.js",
                "~/App/Slider/Config.js",
                "~/App/Slider/Controllers/*.js"));

            bundles.Add(new Bundle("~/bundles/esqtv-theme").Include(
                "~/App/Theme/App.js",
                "~/App/Theme/Config.js",
                "~/App/Theme/Controllers/*.js"));
        }
    }
}