import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import FetchStarWars from '../apis/api';
import ExcludeResidents from '../utils/utility';

function Table() {
  const { tableData, setTableData } = useContext(MyContext);

  useEffect(() => {
    async function FetchTableData() {
      const data = await FetchStarWars();
      setTableData(ExcludeResidents(data));
    }
    FetchTableData();
  }, []);

  return (
    <div>
      Table
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>rotation_period</th>
            <th>orbital_period</th>
            <th>diameter</th>
            <th>climate</th>
            <th>gravity</th>
            <th>terrain</th>
            <th>surface_water</th>
            <th>population</th>
            <th>films</th>
            <th>created</th>
            <th>edited</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((planet) => (
            <tr key={ `key-${planet.name}` }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
