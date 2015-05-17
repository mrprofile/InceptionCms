using System;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Inception.Web.Infrastructure.Utilities;
using ServiceStack.CacheAccess;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;
using ServiceStack.WebHost.Endpoints;

namespace Inception.Web.Controllers
{
    public class BaseController : Controller
    {
        /// <summary>
        /// 
        /// </summary>
        private ICacheClient _cache;
        public virtual ICacheClient Cache
        {
            get { return _cache ?? (_cache = AppHostBase.Resolve<ICacheClient>()); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        public void AuthenticateWithServiceStack(string userName, string password)
        {
            var client = new EsqtvWebClient(ConfigurationManager.AppSettings["AuthenticationService"]);
            
            var authResponse = client.Post(new Auth
            {
                UserName = userName,
                Password = password,
                RememberMe = true,
            });
            foreach (var htc in from Cookie cookie in client.CookieContainer.GetCookies(new Uri(client.BaseUri)) select cookie)
            {
                Response.SetCookie(new HttpCookie(htc.Name, htc.Value));
            }

            Response.SetCookie(new HttpCookie("X-ESQTV-SID", authResponse.SessionId));
        }

        public AuthUserSession CurrentSession()
        {
            var httpCookie = Request.Cookies["X-ESQTV-SID"];
            if (httpCookie != null)
            {
                var currentSession = httpCookie.Value;
                return Cache.Get<AuthUserSession>(SessionFeature.GetSessionKey(currentSession));
            }

            return null;
        }

        /// <summary>
        /// Logg off and clear session in service stack.
        /// </summary>
        public void ServiceStackLogOff()
        {
            try
            {
                var httpCookie = Request.Cookies["X-ESQTV-SID"];
                if (httpCookie != null)
                {
                    var currentSession = httpCookie.Value;
                    Cache.Remove(SessionFeature.GetSessionKey(currentSession));
                }
            }

            catch { }
        }

        public String RenderRazorViewToString(ControllerContext controllerContext, String viewName, Object model)
        {
            controllerContext.Controller.ViewData.Model = model;

            using (var sw = new StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(controllerContext, viewName);
                var viewContext = new ViewContext(controllerContext, viewResult.View, controllerContext.Controller.ViewData, controllerContext.Controller.TempData, sw);
                
                viewResult.View.Render(viewContext, sw);
                viewResult.ViewEngine.ReleaseView(controllerContext, viewResult.View);
                
                return sw.GetStringBuilder().ToString();
            }
        }
    }
}
