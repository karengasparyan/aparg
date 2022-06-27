import React from 'react';
import './style.scss';
import useCollapse from "react-collapsed";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

const Collapse = (props,{title, description}) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapse">
            <div>
                <div {...getToggleProps()} className="buttonContainer">
                    <span className="title">{props.title}</span>
                    <span className="description">{props.description}</span>
                    <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="chevronDownDropdown"/>
                </div>
                <section {...getCollapseProps()}>
                    <div style={{marginLeft: 5}}>
                        {props.children}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Collapse;
