import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from 'react-router-dom';
import {watchList} from "../../store/actions/histories";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRedo, faFilter} from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import Filters from "../../Components/Filters";
import {parse} from "query-string";
import Header from "../../Components/Header";
import Story from "../../Components/Story";

const Home = () => {
  const {stories, next_page_token} = useSelector(state => state.stories);
  const [searchParams, setSearchParams] = useSearchParams();
  const [intervalTime, setIntervalTime] = useState("10000");
  const [showFilters, setShowFilters] = useState(false);
  const [size, setSize] = useState(1600);
  const dispatch = useDispatch();
  const responseStyles = {
    768: {
      showReloadIcon: false,
    },
    320: {
      backgroundColor: "green"
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const queries = parse(window.location.search, {arrayFormat: 'comma'});
      dispatch(watchList(queries));
    }, +intervalTime)
    return () => {
      clearInterval(interval);
    }
  }, [intervalTime]);

  useEffect(() => {
    dispatch(watchList({}));
  }, [])

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, [next_page_token])

  const handleScroll = (ev) => {
    if (ev.target.documentElement.scrollHeight - (ev.target.documentElement.scrollTop + window.innerHeight) < 1) {
      dispatch(watchList({next: true, next_page_token}));
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleResize = (ev) => {
    const width = ev.target.screen.availWidth;
    if (width < 769 && width > 320) {
      return setSize(768)
    } else if (width < 320) {
      return setSize(320)
    } else {
      return setSize(1600)
    }
  }

  const onFilters = ({order, languages, intervalValue}) => {
    setIntervalTime(intervalValue);
    setSearchParams({order, languages: languages && languages?.join()})
    dispatch(watchList({order, languages: languages || []}));
  }

  const resetFilters = useCallback((order) => {
    setSearchParams({order: "", languages: ""})
    dispatch(watchList({}));
  }, []);

  const showFilterBar = () => {
    setShowFilters(!showFilters)
  }

  const refresh = () => {
    const queries = parse(window.location.search, {arrayFormat: 'comma'});
    dispatch(watchList(queries));
  }

  return (
    <div className="home">
      <Header/>
      {/*<div style={{backgroundColor: responseStyles[size]?.backgroundColor}} className="watchList">*/}
      <div className="watchList">
        <div className="watchContainer">
          <div className="watchlistNameContainer">
            <h1 className="watchlistName">Watchlist Name</h1>
          </div>
          <div className="refreshAndFiltersContainer">
            <div onClick={refresh} className="refreshButton">
              <FontAwesomeIcon icon={faRedo} className="redo"/>
              {size > 768 && <span>Refresh</span>}
            </div>
            <div onClick={showFilterBar} className={showFilters ? "activeButton" : "inactiveButton"}>
              <FontAwesomeIcon icon={faFilter} className="redo"/>
              <span>Filters</span>
            </div>
          </div>
        </div>
        {showFilters && <Filters filters={onFilters} resetFilters={resetFilters}/>}
        {stories?.map(s => (
          <Story
            key={s.id}
            id={s.id}
            imageUrls={s.imageUrls}
            expanded_url={s.expanded_url}
            title={s.title}
            domain_cached_logo_url={s.domain_cached_logo_url}
            domain_host={s.domain_host}
            description={s.description}
            score={s.score}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
