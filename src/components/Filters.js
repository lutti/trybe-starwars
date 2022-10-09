import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const [filter, setFilter] = useState({
    coluna: 'population',
    operador: 'maior que',
    number: 0,
  });

  const {
    tableData,
    filteredTable,
    setFilteredTable,
    buscado,
    setBuscado,
    filterByNumeric,
    setFilterNumeric,
  } = useContext(MyContext);

  const data = buscado ? filteredTable : tableData;

  const applyFilter = (dataset, filtro) => {
    if (filtro.operador === 'menor que') {
      return dataset
        .filter((planet) => Number(planet[filtro.coluna]) < Number(filtro.number));
    }
    if (filtro.operador === 'maior que') {
      return dataset
        .filter((planet) => Number(planet[filtro.coluna]) > Number(filtro.number));
    }
    return dataset
      .filter((planet) => Number(planet[filtro.coluna]) === Number(filtro.number));
  };

  useEffect(() => {
    if (filterByNumeric.length > 0) {
      const tabData = filterByNumeric.reduce((acc, curr) => applyFilter(acc, curr), data);
      setFilteredTable(tabData);
      setBuscado(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByNumeric]);

  const clickFilter = () => {
    setFilterNumeric([...filterByNumeric, { ...filter }]);
    // const tabData = filterByNumeric.reduce((acc, curr) => applyFilter(acc, curr), data);
    // setFilteredTable(tabData);
    // setBuscado(true);
  };

  return (
    <div>
      <select
        name="coluna"
        value={ filter.coluna }
        onChange={ ({ target }) => setFilter({ ...filter, coluna: target.value }) }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        name="operador"
        value={ filter.operador }
        onChange={ ({ target }) => setFilter({ ...filter, operador: target.value }) }
        data-testid="comparison-filter"
      >
        <option value="menor que">menor que</option>
        <option value="maior que">maior que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        value={ filter.number }
        onChange={ ({ target }) => setFilter({ ...filter, number: target.value }) }
        data-testid="value-filter"
      />
      <button type="button" onClick={ clickFilter } data-testid="button-filter">
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
