import React, {useState, useCallback, useMemo} from 'react';
import './style.scss';
import Dropdown from "../Dropdown";
import Collapse from "../Collapse";

const Filters = ({filters, resetFilters}) => {

    let [order, setOrder] = useState("");
    let [languages, setLanguages] = useState([]);
    let [intervalValue, setIntervalValue] = useState("10000");

    const ordersOptions = useMemo(() => [
        {value: "top", label: "Top Rate"},
        {value: "latest", label: "Latest"},
        {value: "read", label: "Mast Read"},
        {value: "retweeted", label: "Popular"},
    ], []);

    const languagesOptions = useMemo(() => [
        {value: "en", label: "English"},
        {value: "de", label: "German"},
        {value: "zh", label: "Chinese"},
        {value: "it", label: "Italian"},
    ], []);

    const intervalsOptions = useMemo(() => [
        {value: 10000, label: "10 seconds"},
        {value: 30000, label: "30 seconds"},
        {value: 60000, label: "1 minute"},
        {value: 600000, label: "10 minutes"},
    ], []);

    const handleChangeOrders = useCallback((order) => {
        setOrder(order);
        filters({order, languages, intervalValue});
    }, []);

    const handleChangeLanguages = useCallback((value) => {
        if (!languages.includes(value)) {
            languages.push(value);
        } else {
            languages = languages.filter(o => o !== value);
        }
        setLanguages(languages);
        filters({order, languages, intervalValue});
    }, [languages]);

    const handleChangeIntervals = useCallback((intervalValue) => {
        setIntervalValue(intervalValue)
        filters({order, languages, intervalValue});
    }, []);

    const reset = () => {
        resetFilters()
        setOrder("")
        setLanguages([])
    }

    return (
        <div className="filters">
            <Collapse title="1 min" description="AUTOREFRESH">
                <Dropdown
                  onchange={handleChangeIntervals}
                  options={intervalsOptions}
                  checked={intervalValue}
                  title="AUTOREFRESH"
                />
            </Collapse>
            <Collapse title="Top Rated" description="ORDER">
                <Dropdown
                  onchange={handleChangeOrders}
                  options={ordersOptions}
                  checked={order}
                  title="ORDER"
                />
            </Collapse>
            <Collapse title="All Languages" description="LANGUAGES">
                <Dropdown
                  onchange={handleChangeLanguages}
                  options={languagesOptions}
                  checked={languages}
                  multiple={true}
                  title="LANGUAGES"
                />
            </Collapse>
            <div className="resetContainer" onClick={reset}>
                <span className="reset">RESET</span>
            </div>
        </div>
    );
};

export default Filters;
