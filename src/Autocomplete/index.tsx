import React from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import {Country} from '../data';
import Highlight from './Highlight';

type Props = {
  data: Country[];
};

function Autocomplete(props: Props): JSX.Element {
  const {data} = props;

  const [value, setValue] = React.useState<string>('');
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<string>('');

  const handleOpen = function () {
    if (value.length > 0 && selectedItem !== value) {
      setIsOpen(true);
    }
  };

  const handleInputChange = function (
    event: React.ChangeEvent<{}>,
    newInputValue: string
  ) {
    setValue(newInputValue);
    if (newInputValue.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleOnChange = function (
    event: React.ChangeEvent<{}>,
    value: Country | null
  ) {
    if (value && value.name) {
      setSelectedItem(value.name);
    }
  };

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions
  } = useAutocomplete({
    id: 'form-control',
    options: data,
    autoComplete: true,
    open: isOpen, // Manually control
    onOpen: handleOpen, // Manually control
    onClose: () => setIsOpen(false), // Manually control
    inputValue: value, // Manually control
    onInputChange: handleInputChange, // Manually control
    onChange: handleOnChange, // Manually control to get the selected value
    getOptionLabel: (option) => option.name
  });

  const listItem = {
    className: 'form-control__item'
  };

  return (
    <div className="app">
      <div className="form">
        <div {...getRootProps()}>
          <input
            type="text"
            className="form-control"
            placeholder="Your zipcode"
            {...getInputProps()}
          />
        </div>
        {groupedOptions.length > 0 && (
          <ul
            className="form-control__box"
            aria-labelledby="autocompleteMenu"
            {...getListboxProps()}
          >
            {groupedOptions.map((option, index) => {
              return (
                <li {...getOptionProps({option, index})} {...listItem}>
                  <Highlight search={value} text={option.name} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Autocomplete;
