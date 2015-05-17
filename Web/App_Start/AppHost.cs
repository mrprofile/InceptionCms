using Funq;
using ServiceStack.CacheAccess;
using ServiceStack.Configuration;
using ServiceStack.Redis;
using ServiceStack.ServiceInterface;
using ServiceStack.WebHost.Endpoints;

namespace Inception.Web.App_Start
{
    public class AppHost : AppHostBase
    {
        public AppHost()
            : base("Esqtv CMS Service Listener", typeof(TestService).Assembly)
        {

        }

        public override void Configure(Container container)
        {
            container.Register<IResourceManager>(new ConfigurationResourceManager());
            var appSettings = container.Resolve<IResourceManager>();

            // register storage for user sessions 
            container.Register<ICacheClient>(new RedisClient(appSettings.GetString("Redis")));
            container.Register<ISessionFactory>(c => new SessionFactory(c.Resolve<ICacheClient>()));
        }
    }

    public class TestService : Service
    {
        
    }

}