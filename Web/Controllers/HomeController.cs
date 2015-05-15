using System.Web.Mvc;
using Inception.Web.Infrastructure.MvcViewPage;

namespace Inception.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var viewModel = new Models.Home.Index { Title = "Home Page of Inception" };

            return View(viewModel);
        }

        public ActionResult Videos()
        {
            var viewModel = new Models.Video.Index
            {
                Title = "Home Page of Inception",
            };

            return View(viewModel);
        }

        public ActionResult Sliders()
        {
            var viewModel = new Models.Slider.Index()
            {
                Title = "Home Page of Inception"
            };

            return View(viewModel);
        }

        public ActionResult Themes()
        {
            var viewModel = new Models.Theme.Index
            {
                Title = "Theme Page of Inception"
            };

            return View(viewModel);
        }
    }
}