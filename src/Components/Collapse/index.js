import React from 'react';
import './style.scss';
import useCollapse from "react-collapsed";

const Collapse = (props,{title, description}) => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="collapse">
            <div>
                <div {...getToggleProps()} className="buttonContainer">
                    <span className="title">{props.title}</span>
                    <span className="description">{props.description}</span>
                </div>
                <section {...getCollapseProps()}>
                    <div style={{marginLeft: 5, zIndex: 1}}>
                        {props.children}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Collapse;
