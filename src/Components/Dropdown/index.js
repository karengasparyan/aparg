import React from 'react';
import PropTypes from "prop-types";
import './style.scss';

const Dropdown = ({onchange, options, checked, multiple = false, title }) => {
    return (

        <div className="dropdown">
            <span className="title">{title}</span>
            {options?.map((o, index) => (
                <div key={o.value} className="optionsContainer">
                    <input
                        onChange={() => onchange(o.value, index)}
                        type="checkbox"
                        checked={multiple ? checked.includes(o.value) : o.value == checked}
                    />
                    <label className="label">{o.label}</label>
                </div>
            ))}
        </div>
    );
};

export default Dropdown;

Dropdown.propTypes = {
    onchange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    checked: PropTypes.any,
    multiple: PropTypes.bool,
};
