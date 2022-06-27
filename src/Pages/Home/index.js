import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams, createSearchParams, useLocation} from 'react-router-dom';
import {watchList} from "../../store/actions/histories";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo, faFilter } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import Filters from "../../Components/Filters";
import {parse} from "query-string";
import Header from "../../Components/Header";

const Home = () => {
    const {stories} = useSelector(state => state.stories);
    const [searchParams, setSearchParams] = useSearchParams();
    const [intervalTime, setIntervalTime] = useState("10000");
    const [showFilters, setShowFilters] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();

    // const queryParams = {
    //     page: searchParams.get('page') && !isNaN(+searchParams.get('page')) ? searchParams.get('page') : 1,
    // };
    //
    // const listRequest = () => {
    //   setSearchParams( createSearchParams(queryParams) );
    //   dispatch(actionMaker(LIST_REQUEST, queryParams));
    // }

    useEffect(() => {
        const interval = setInterval(() => {
            const queries = parse(window.location.search,{arrayFormat: 'comma'});
            dispatch(watchList(queries));
        },+intervalTime)
        return () => {
            clearInterval(interval);
        }
    }, [intervalTime]);

    useEffect(() => {
        dispatch(watchList({}));
    },[])

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
        const queries = parse(window.location.search,{arrayFormat: 'comma'});
        dispatch(watchList(queries));
    }

    return (
      <div className="home">
          <Header />
          <div className="watchList">
              <h1 className="Watchlist-Name">Watchlist Name</h1>
              <span onClick={refresh} className="refreshButton">
                  <FontAwesomeIcon icon={faRedo} className="redo" />
                  <span>Refresh</span>
              </span>
              <span onClick={showFilterBar} className={showFilters ? "activeButton" : "inactiveButton"}>
                  <FontAwesomeIcon icon={faFilter} className="redo" />
                  <span>Filters</span>
              </span>
              {showFilters && <Filters filters={onFilters} resetFilters={resetFilters} />}
              {stories?.map(s => (
                <div className="mask" key={s.id}>
                    <p>{s.title}</p>
                </div>
              ))}
          </div>
      </div>
    );
};

export default Home;
