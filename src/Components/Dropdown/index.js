import React, {useState} from 'react';
import PropTypes from "prop-types";
import './style.scss';
import useCollapse from "react-collapsed";

const Dropdown = ({onchange, options, checked, multiple = false}) => {
    return (
        <div className="dropdown">
            {options?.map((o, index) => (
                <div key={o.value} className="optionsContainer">
                    <input
                        onChange={() => onchange(o.value, index)}
                        type="checkbox"
                        checked={multiple ? null : o.value == checked}
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
    checked: PropTypes.string,
    multiple: PropTypes.bool,
};