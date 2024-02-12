using Microsoft.AspNetCore.Mvc;

namespace Track.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackController : ControllerBase
    {
        private IConfiguration _configuration;
        public TrackController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetTracks")]
        public string GetTracks()
        {
            return "Tracks";
        }
    }
}