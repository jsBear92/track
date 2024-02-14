using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Track.Data;
using Track.Models;

namespace Track.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private IConfiguration _configuration;
        public CategoryController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllCategories()
        {
            return await _db.Categories.ToListAsync();
        }
    }
}