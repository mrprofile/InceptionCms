using System;
using System.Web.Mvc;
using System.Web.Security;
using Inception.Web.Models;

namespace Inception.Web.Controllers
{
    public class HomeController : BaseController
    {
        [HttpGet]
        [Authorize]
        public ActionResult Index()
        {
            var viewModel = new Models.Home.Index { Title = "Home Page of Inception" };

            return View(viewModel);
        }

        [HttpGet]
        [Authorize]
        public ActionResult Videos()
        {
            var viewModel = new Models.Video.Index
            {
                Title = "Home Page of Inception",
            };

            return View(viewModel);
        }

        [HttpGet]
        [Authorize]
        public ActionResult Galleries()
        {
            var viewModel = new Models.Video.Index
            {
                Title = "Home Page of Inception",
            };

            return View(viewModel);
        }

        [HttpGet]
        [Authorize]
        public ActionResult Sliders()
        {
            var viewModel = new Models.Slider.Index()
            {
                Title = "Home Page of Inception"
            };

            return View(viewModel);
        }

        [HttpGet]
        [Authorize]
        public ActionResult Themes()
        {
            var viewModel = new Models.Theme.Index
            {
                Title = "Theme Page of Inception"
            };

            return View(viewModel);
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult Login(string returnUrl)
        {
            var viewModel = new LoginViewModel();

            ViewBag.ReturnUrl = returnUrl;
            return View(viewModel);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login(LoginViewModel model , string returnUrl)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string[] arrUsername = model.UserName.Split('\\');
                    string strDomain = arrUsername[0];
                    string strUsername = arrUsername[1];

                    AuthenticateWithServiceStack(strUsername, strDomain);
                    FormsAuthentication.SetAuthCookie(model.UserName, true);

                    return RedirectToLocal(returnUrl);
                }
                catch (Exception ex)
                {
                }
            }

            // If we got this far, something failed, redisplay form
            ModelState.AddModelError("Errors", "The domain and user name provided was not found.");
            return View(model);
        }

        public ActionResult LogOff()
        {
            ServiceStackLogOff();
            FormsAuthentication.SignOut();

            // Expire the cookie
            if (Request.Cookies["cms"] != null)
            {
                Response.Cookies["cms"].Expires = DateTime.Now.AddDays(-1);
            }

            if (Request.Cookies["ss-pid"] != null)
            {
                Response.Cookies["ss-pid"].Expires = DateTime.Now.AddDays(-1);
            }

            if (Request.Cookies["ss-opt"] != null)
            {
                Response.Cookies["ss-opt"].Expires = DateTime.Now.AddDays(-1);
            }

            if (Request.Cookies["ss-id"] != null)
            {
                Response.Cookies["ss-id"].Expires = DateTime.Now.AddDays(-1);
            }

            if (Request.Cookies["X-ESQTV-SID"] != null)
            {
                Response.Cookies["X-ESQTV-SID"].Expires = DateTime.Now.AddDays(-1);
            }

            return Redirect("/");
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
                return Redirect(returnUrl);

            return RedirectToAction("Index", "Home");
        }
    }
}