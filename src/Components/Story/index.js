import React, {useState} from 'react';
import './style.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

const Story = ({id, imageUrls, expanded_url, title, domain_cached_logo_url, domain_host, description, score}) => {
  const [show, setShow] = useState(false);
  const color = score > 40 ? "#4eb495" : "#ffb300";

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const showDescription = () => {
    setShow(!show);
  };

  const handleError = (ev) => {
    return ev.target.src = "/images/user-286.png"
  }

  return (
    <div className="mask" key={id}>
      <img className="image" src={imageUrls && imageUrls[0]} alt="image"/>
      <div>
        <p onClick={() => openInNewTab(expanded_url)} className="title">{title}</p>
        <div className="infoContainer">
          <img onError={handleError} src={domain_cached_logo_url} alt="image"/>
          <p>{domain_host}</p>
        </div>
        <div style={{border: `solid 1px ${color}`}} className="percent">{score}%</div>
        <FontAwesomeIcon onClick={showDescription} icon={show ? faChevronUp : faChevronDown} className="chevronDown"/>
        {show && <p>{description}</p>}
      </div>
    </div>
  );
};

export default Story;
