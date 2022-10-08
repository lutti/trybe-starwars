import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';

function Header() {
  const [planet, setPlanet] = useState({ name: '' });
  const { tableData, setFilteredTable, setBuscado } = useContext(MyContext);

  useEffect(() => {
    if (planet.name !== null && planet.name.length !== 0) {
      setFilteredTable(tableData.filter((e) => e.name.includes(planet.name)));
      setBuscado(true);
    } else {
      setFilteredTable(tableData);
      setBuscado(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planet]);
  return (
    <div>
      <h1>Star Wars Planets</h1>
      <input
        type="text"
        value={ planet.name }
        name="planet"
        data-testid="name-filter"
        onChange={ ({ target }) => setPlanet({ name: target.value }) }
      />

    </div>
  );
}

export default Header;
