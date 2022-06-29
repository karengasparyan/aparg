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
  const dispatch = useDispatch();

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
      document.removeEventListener("scroll", handleScroll)
    }
  }, [next_page_token])

  const handleScroll = (ev) => {
    if (ev.target.documentElement.scrollHeight - (ev.target.documentElement.scrollTop + window.innerHeight) < 1){
        dispatch(watchList({next : true, next_page_token}));
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
      <div className="watchList">
        <h1 className="Watchlist-Name">Watchlist Name</h1>
        <span onClick={refresh} className="refreshButton">
            <FontAwesomeIcon icon={faRedo} className="redo"/>
            <span>Refresh</span>
        </span>
        <span onClick={showFilterBar} className={showFilters ? "activeButton" : "inactiveButton"}>
            <FontAwesomeIcon icon={faFilter} className="redo"/>
            <span>Filters</span>
        </span>
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
