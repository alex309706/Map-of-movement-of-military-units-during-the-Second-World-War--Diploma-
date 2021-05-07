﻿using System;
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
    public class TypesOfSubdivisionController : ControllerBase
    {
        private readonly SubdivisionsContext _context;

        public TypesOfSubdivisionController(SubdivisionsContext context)
        {
            _context = context;
        }

        // GET: api/TypesOfSubdivision
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeOfSubdivision>>> GetTypesOfSubdivision()
        {
            return await _context.TypesOfSubdivision.ToListAsync();
        }

        // GET: api/TypesOfSubdivision/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeOfSubdivision>> GetTypeOfSubdivision(int id)
        {
            var typeOfSubdivision = await _context.TypesOfSubdivision.FindAsync(id);

            if (typeOfSubdivision == null)
            {
                return NotFound();
            }

            return typeOfSubdivision;
        }

        // PUT: api/TypesOfSubdivision/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeOfSubdivision(int id, TypeOfSubdivision typeOfSubdivision)
        {
            if (id != typeOfSubdivision.Id)
            {
                return BadRequest();
            }

            _context.Entry(typeOfSubdivision).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypeOfSubdivisionExists(id))
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

        // POST: api/TypesOfSubdivision
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TypeOfSubdivision>> PostTypeOfSubdivision(TypeOfSubdivision typeOfSubdivision)
        {
            _context.TypesOfSubdivision.Add(typeOfSubdivision);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTypeOfSubdivision", new { id = typeOfSubdivision.Id }, typeOfSubdivision);
        }

        // DELETE: api/TypesOfSubdivision/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTypeOfSubdivision(int id)
        {
            var typeOfSubdivision = await _context.TypesOfSubdivision.FindAsync(id);
            if (typeOfSubdivision == null)
            {
                return NotFound();
            }

            _context.TypesOfSubdivision.Remove(typeOfSubdivision);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TypeOfSubdivisionExists(int id)
        {
            return _context.TypesOfSubdivision.Any(e => e.Id == id);
        }
    }
}
