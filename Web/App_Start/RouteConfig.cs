using System.Web.Mvc;
using System.Web.Routing;

namespace Inception.Web.App_Start
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //routes.MapRoute(
            //    name: "videos",
            //    url: "videos/{*catchall}",
            //    defaults: new { controller = "Home", action = "Videos" },
            //    namespaces: new[] { "Inception.Web.Controllers" });

            //routes.MapRoute(
            //    name: "galleries",
            //    url: "galleries/{*catchall}",
            //    defaults: new { controller = "Home", action = "Galleries" },
            //    namespaces: new[] { "Inception.Web.Controllers" });

            //routes.MapRoute(
            //    name: "pages",
            //    url: "pages/{*catchall}",
            //    defaults: new { controller = "Home", action = "Pages" },
            //    namespaces: new[] { "Inception.Web.Controllers" });

            //routes.MapRoute(
            //    name: "sliders",
            //    url: "sliders/{*catchall}",
            //    defaults: new { controller = "Home", action = "Sliders" },
            //    namespaces: new[] { "Inception.Web.Controllers" });

            //routes.MapRoute(
            //    name: "themes",
            //    url: "themes/{*catchall}",
            //    defaults: new { controller = "Home", action = "Themes" },
            //    namespaces: new[] { "Inception.Web.Controllers" });

            routes.MapRoute(
               name: "login",
               url: "login",
               defaults: new { controller = "Home", action = "Login" },
               namespaces: new[] { "Inception.Web.Controllers" });

            routes.MapRoute(
               name: "logoff",
               url: "logoff",
               defaults: new { controller = "Home", action = "logoff" },
               namespaces: new[] { "Inception.Web.Controllers" });

            routes.MapRoute(
                name: "home",
                url: "{*catchall}",
                defaults: new { controller = "Home", action = "Index" },
                namespaces: new[] { "Inception.Web.Controllers" });

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "Inception.Web.Controllers" });
        }
    }
}
