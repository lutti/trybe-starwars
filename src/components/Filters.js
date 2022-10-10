import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';

const COLUNA_IS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Filters() {
  const [filter, setFilter] = useState({
    coluna: 'population',
    operador: 'maior que',
    number: 0,
  });
  const [columOptions, setColumOptions] = useState(COLUNA_IS);

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
    setColumOptions(columOptions.filter((f) => f !== filtro.coluna));
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

  useEffect(() => {
    if (columOptions.length > 0) {
      setFilter({ ...filter, coluna: columOptions[0] });
    } else {
      setFilter({ ...filter, coluna: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columOptions]);

  const clickFilter = () => {
    setFilterNumeric([...filterByNumeric, { ...filter }]);
    // const tabData = filterByNumeric.reduce((acc, curr) => applyFilter(acc, curr), data);
    // setFilteredTable(tabData);
    // setBuscado(true);
  };

  const clickDeleteFilter = (coluna) => {
    // data = tableData;
    setBuscado(false);
    setFilterNumeric(filterByNumeric.filter((fil) => fil.coluna !== coluna));
    setColumOptions(columOptions.concat(coluna));
  };

  const clickDeleteAllFilters = () => {
    setBuscado(false);
    setFilterNumeric([]);
    setColumOptions(COLUNA_IS);
  };

  return (
    <>
      <div>
        <select
          name="coluna"
          value={ filter.coluna }
          onChange={ ({ target }) => setFilter({ ...filter, coluna: target.value }) }
          data-testid="column-filter"
        >
          {
            columOptions.map((coluna) => (
              <option key={ coluna } value={ coluna }>{ coluna }</option>
            ))
          }
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
        <button
          type="button"
          onClick={ clickDeleteAllFilters }
          data-testid="button-remove-filters"
        >
          Remover Todos Filtros
        </button>
      </div>
      <div>
        {
          filterByNumeric.map((filtro) => (
            <div
              key={ `fil-${filtro.coluna}` }
              id={ `fil-${filtro.coluna}` }
              data-testid="filter"
            >
              <p>
                { `${filtro.coluna} ${filtro.operador} ${filtro.number}` }
              </p>
              <button
                type="button"
                onClick={ ({ target }) => (
                  clickDeleteFilter(target.parentElement.id.split('-')[1])
                ) }
              >
                DELETE
              </button>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default Filters;
