using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MapWebApi.Models;

namespace MapWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActualDataController : ControllerBase
    {
        private readonly SubdivisionsContext _context;

        public ActualDataController(SubdivisionsContext context)
        {
            _context = context;
        }

        // GET: api/ActualData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActualData>>> GetActualData()
        {
            return await _context.ActualData.ToListAsync();
        }

        // GET: api/ActualData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActualData>> GetActualData(int id)
        {
            var actualData = await _context.ActualData.FindAsync(id);

            if (actualData == null)
            {
                return NotFound();
            }

            return actualData;
        }

        // PUT: api/ActualData/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActualData(int id, ActualData actualData)
        {
            if (id != actualData.Id)
            {
                return BadRequest();
            }

            _context.Entry(actualData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActualDataExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ActualData
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ActualData>> PostActualData(ActualData actualData)
        {
            _context.ActualData.Add(actualData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetActualData", new { id = actualData.Id }, actualData);
        }

        // DELETE: api/ActualData/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActualData(int id)
        {
            var actualData = await _context.ActualData.FindAsync(id);
            if (actualData == null)
            {
                return NotFound();
            }

            _context.ActualData.Remove(actualData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActualDataExists(int id)
        {
            return _context.ActualData.Any(e => e.Id == id);
        }
    }
}
