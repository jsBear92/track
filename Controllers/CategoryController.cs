using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Track.DataAccess.Data;
using Track.Models.Models;

namespace Track.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _configuration;
        public CategoryController(IConfiguration configuration, ApplicationDbContext db)
        {
            _configuration = configuration;
            _db = db;
        }

        // GET: api/Category
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllCategories()
        {
            return await _db.categories.OrderBy(c => c.Id).ToListAsync();
        }

        // GET: api/Category/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategoryById(int id)
        {
            var category = await _db.categories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;

        }

        // POST: api/Category
        [HttpPost()]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Category>> CreateCategory(Category category)
        {
            if (category.Name == category.DisplayOrder.ToString())
            {
                return BadRequest();
            }
            if (ModelState.IsValid)
            {
                _db.categories.Add(category);
                await _db.SaveChangesAsync();
            }
            return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);
        }

        // PUT: api/Category/{id}
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateCategory(int? id, Category category)
        {
            var categoryInDb = await _db.categories.FindAsync(id);
            if (categoryInDb == null)
            {
                return NotFound();
            }

            // Manually update the properties you want to change
            categoryInDb.Name = category.Name;
            categoryInDb.DisplayOrder = category.DisplayOrder + 1; // Assuming you still want to auto-increment this

            // No need to call _db.categories.Update(categoryInDb) as it's already being tracked

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_db.categories.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(categoryInDb); // Alternatively, you can simply return NoContent();
        }

        // DELETE: api/Category/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            // Find the category by ID
            var category = await _db.categories.FindAsync(id);
            if (category == null)
            {
                // If not found, return a NotFound result
                return NotFound();
            }

            // Remove the category from the DbContext
            _db.categories.Remove(category);

            // Save the changes to the database
            await _db.SaveChangesAsync();

            // Return a NoContent result to indicate the operation was successful
            return NoContent();
        }

    }
}