function ExcludeResidents(planetsList) {
  return planetsList.map((planet) => ({
    name: planet.name,
    rotation_period: planet.rotation_period,
    orbital_period: planet.orbital_period,
    diameter: planet.diameter,
    climate: planet.climate,
    gravity: planet.gravity,
    terrain: planet.terrain,
    surface_water: planet.surface_water,
    population: planet.population,
    films: planet.films,
    created: planet.created,
    edited: planet.edited,
    url: planet.url,
  }));
}

export default ExcludeResidents;
