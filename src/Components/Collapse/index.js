import React from 'react';
import './style.scss';
import useCollapse from "react-collapsed";

const Collapse = (props,{title, description}) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapse">
            <div>
                <div {...getToggleProps()} className="buttonContainer">
                    <span>{props.title}</span>
                    <span>{props.description}</span>
                </div>
                <section {...getCollapseProps()}>
                    {props.children}
                </section>
            </div>
        </div>
    );
};

export default Collapse;