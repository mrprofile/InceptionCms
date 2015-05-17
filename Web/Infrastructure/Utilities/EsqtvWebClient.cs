using System.Web;
using ServiceStack.ServiceClient.Web;

namespace Inception.Web.Infrastructure.Utilities
{
    public class EsqtvWebClient : JsonServiceClient
    {
        protected HttpCookie UserSessionId
        {
            get 
            {                
                return HttpContext.Current.Request.Cookies.Get("X-ESQTV-SID");
            }
        }

        public EsqtvWebClient(string baseUri)
            : base(baseUri)
        {

        }

        public EsqtvWebClient()
        {

        }

        /// <summary>
        /// This method sends the request to the server with "ss-pid" and "X-UAId" already pre-populated in the header. Use this method for any subsequent calls to 
        /// service stack after being authenticated.
        /// </summary>
        /// <typeparam name="TResponse"></typeparam>
        /// <param name="request"></param>
        /// <returns></returns>
        public TResponse SendSecure<TResponse>(object request)
        {
            LocalHttpWebRequestFilter = req => req.Headers.Add("X-ESQTV-SID", UserSessionId.Value);

            return base.Send<TResponse>(request);
        }
    }
}