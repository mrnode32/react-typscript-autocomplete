import React from 'react';
import { Country } from '../data';

type Props = {
  data: Country[];
};

function Autocomplete(props: Props): JSX.Element {
  const { data } = props;

  return (
    <div className="form">
      <input
        type="text"
        className="form-control"
        placeholder="Your zipcode"
      />
      <ul className="form-control__box" aria-labelledby="autocompleteMenu">
        {data.map((element) => {
          return (
            <li key={element.name}>
              <div className="form-control__item">{element.name}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Autocomplete;
