import React from 'react';
import data from './data';
import Autocomplete from './Autocomplete';

function App(): JSX.Element {
  return (
    <>
      <Autocomplete data={data} />
    </>
  );
}

export default App;
