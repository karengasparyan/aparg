import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useSearchParams, createSearchParams, useLocation} from 'react-router-dom';
import {watchList} from "../../store/actions/histories";
import './style.scss';
import Filters from "../../Components/Filters";
import {parse} from "query-string";

const Home = () => {
    const {stories} = useSelector(state => state.stories);
    const [searchParams, setSearchParams] = useSearchParams();
    const [intervalTime, setIntervalTime] = useState("10000");
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

    return (
        <div className="watchList">
            <Filters filters={onFilters} />
            {stories?.map(s => (
                <div key={s.id}>
                    <p>{s.title}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;
