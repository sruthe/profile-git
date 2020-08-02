import React, {Fragment, useEffect, useState} from "react";
import _ from "lodash";

const types=["All", "Sources", "Forks", "Archived", "Mirrors"]

export function Search(props) {

    const [typeFilter,setTypeFilter]=useState("All")
    const [langFilter,setLangFilter]=useState("All")
    const [showDropdown, setShowDropdown] = useState(false)

    let {searchBy,filterBy}=props;

    function search(event) {
        let searchText = event.target.value.toLowerCase();
        searchBy(searchText);
    }

    function toggleDropdown() {
        setShowDropdown(!showDropdown)
    }

    function changeType(value){
        setTypeFilter(value);
        filterBy(value);
        toggleDropdown();
    }

    let style = showDropdown? {display:'block'}:{display: 'none'};
    return (
        <div className={'search-container'}>
            <input className={'search-text'} onChange={(event)=>search(event)} type={'text'} placeholder={'Find a repository...'}/>
            <div className={'filter-container'}>
                <div className="dropdown">
                    <button style={{minWidth:'11em', padding:'5px 10px 5px'}} onClick={toggleDropdown}>Type: {typeFilter} <span>&#9660;</span></button>
                    <div className="dropdown-content" style={style}>
                        {types.map(value => <p onClick={()=>changeType(value)}>
                            <span style={{visibility:value===typeFilter?'visible':'hidden'}}>&#x2713;</span>{value}</p>)}
                    </div>
                </div>
                <button className={'lang-filter'}>Language:{langFilter} &#9660;</button>
            </div>
        </div>
    );
}