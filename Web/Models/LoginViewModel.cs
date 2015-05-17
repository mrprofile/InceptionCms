namespace Inception.Web.Models
{
    public class LoginViewModel : BasePageModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}