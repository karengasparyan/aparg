import React, {useState} from 'react';
import './style.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faThumbsUp, faThumbsDown, faBookmark} from "@fortawesome/free-solid-svg-icons";

const Story = ({id, imageUrls, expanded_url, title, domain_cached_logo_url, domain_host, description, score}) => {
  const [height, setHeight] = useState(75);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const color = score > 40 ? "#4eb495" : "#ffb300";

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const showDescription = () => {
    setHeight(height => {
      return height > 75 ? 75 : 220
    })
  };

  const handleShowBookmarks = () => {

    setShowBookmarks(showBookmarks => !showBookmarks)
  };

  return (
    <div className="maskContainer">
      <div className="mask" style={{height: height}} key={id}>
        <img className="image" src={imageUrls ? imageUrls[0] : "/images/notfound.png"} alt="image"/>
        <div>
          <p onClick={() => openInNewTab(expanded_url)} className="title">{title}</p>
          <div className="infoContainer">
            <img src={domain_cached_logo_url} alt="image"/>
            <p>{domain_host}</p>
          </div>
          <div style={{border: `solid 1px ${color}`}} className="percent">{score}%</div>
          <FontAwesomeIcon onClick={showDescription} icon={height > 75 ? faChevronUp : faChevronDown}
                           className="chevronDown"/>
          {height > 75 ? <div>
            <span className="description">{description}</span>
            <div className="bookmarkContainer">
              {showBookmarks && <span>
              <span className="bookmarkText">Like</span><FontAwesomeIcon icon={faThumbsUp} className="thumbs"/>
              <span className="bookmarkText">Dislike</span><FontAwesomeIcon icon={faThumbsDown} className="thumbs"/>
            </span>}
              <span onClick={handleShowBookmarks}>
              <span className="bookmarkText">Bookmark</span><FontAwesomeIcon icon={faBookmark} className="thumbs"/>
            </span>
            </div>
          </div> : null}
        </div>
      </div>

    </div>
  );
};

export default Story;
