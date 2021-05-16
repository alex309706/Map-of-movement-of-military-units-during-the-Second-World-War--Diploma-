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
            var actualData = await _context.ActualData
                                    .Include(actualData => actualData.Subdivision)
                                    .ThenInclude(s => s.Commander)
                                    .ThenInclude(c => c.Rank)
                                    .Include(actualData => actualData.Subdivision)
                                    .ThenInclude(s => s.TypeOfSubdivision)
                                    .Include(actualData => actualData.Location)
                                    .Include(actualData => actualData.Document)
                                    .ToListAsync();
            if (actualData.Count<1)
            {
                var initialData = SetInitialActualData();
                _context.ActualData.AddRange(initialData);
                await _context.SaveChangesAsync();
            }

            return actualData;
                //await _context.ActualData
                //.Include(actualData => actualData.Subdivision)
                //.ThenInclude(s => s.Commander)
                //.ThenInclude(c => c.Rank)
                //.Include(actualData => actualData.Subdivision)
                //.ThenInclude(s => s.TypeOfSubdivision)
                //.Include(actualData => actualData.Location)
                //.Include(actualData => actualData.Document)
                //.ToListAsync();
        }
        // GET: api/ActualData/date
        [HttpGet("{date}")]
        public async Task<ActionResult<IEnumerable<ActualData>>> GetActualData(DateTime date)
        {
            return await _context.ActualData.Where(actualData=>actualData.Date == date)
                .Include(actualData => actualData.Subdivision)
                .ThenInclude(s => s.Commander)
                .ThenInclude(c => c.Rank)
                .Include(actualData => actualData.Subdivision)
                .ThenInclude(s => s.TypeOfSubdivision)
                .Include(actualData => actualData.Location)
                .Include(actualData => actualData.Document)
                .ToListAsync();
        }
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
        private  ActualData[] SetInitialActualData()
        {
            ActualData[] result = new ActualData[2];
            ActualData firstActualData = new ActualData
            {
                Date = new DateTime(1941, 6, 22),
                SubdivisionId = _context.Subdivisions.First().Id,
                DocumentId = _context.Documents.First().Id,
                LocationId = _context.Locations.First().Id,
            };
            ActualData secondActualData = new ActualData
            {
                Date = new DateTime(1941,6,23),
                SubdivisionId = _context.Subdivisions.First().Id,
                DocumentId = _context.Documents.First().Id,
                LocationId = 2
            };
            result[0] = firstActualData;
            result[1] = secondActualData;

            return result;
        }
    }
}
