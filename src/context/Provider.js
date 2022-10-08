import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import FetchStarWars from '../apis/api';

function Provider({ children }) {
  const [tableData, setTableData] = useState([]);
  const [filteredTable, setFilteredTable] = useState([]);
  const [buscado, setBuscado] = useState(false);

  useEffect(() => {
    async function FetchTableData() {
      const data = await FetchStarWars();

      setTableData(data);
    }
    FetchTableData();
  }, []);

  const contextValue = {
    tableData,
    setTableData,
    filteredTable,
    setFilteredTable,
    buscado,
    setBuscado,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
