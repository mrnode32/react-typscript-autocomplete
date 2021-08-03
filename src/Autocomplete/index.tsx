import React, {FunctionComponent} from 'react';
import Highlighter from 'react-highlight-words';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import {Country} from '../data';

interface IHighlightProps {
  children: React.ReactNode;
}

interface IAutocompleteIProps {
  data: Country[];
}

// By default this component uses an HTML Mark Text element (<strong>) to wrap matched text.
const Highlight: FunctionComponent<IHighlightProps> = function(props) {
  const { children } = props;
  return <strong>{children}</strong>;
}

function Autocomplete(props: IAutocompleteIProps) {
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
    groupedOptions,
    inputValue
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
              const HighlighterJSX = (
                <Highlighter
                  searchWords={[inputValue]}
                  autoEscape={true}
                  textToHighlight={option.name}
                  highlightTag={Highlight}
                />
              );
              return (
                <li {...getOptionProps({option, index})} {...listItem}>
                  {HighlighterJSX}
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
