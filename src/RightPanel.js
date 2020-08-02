import React, {Fragment, useEffect, useState} from "react";
import {RepoList} from "./RepoList";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {Search} from "./Search";

export function RightPanel() {
    const [repo, setRepo] = useState([]);
    const [filteredRepo, setFilteredRepo] = useState([]);
    useEffect(()=>{
        fetch('https://api.github.com/users/supreetsingh247/repos')
            .then((res)=>{
                return res.json();
            })
            .then((res)=>{
                console.log(res)
                setRepo(res);
                setFilteredRepo(res);
            })
            .catch((err)=>{
                console.log(err)
            })
    },[]);

    function searchBy(searchParam) {
        let temp = repo.filter(value => {
            let name = value.name?value.name.toLowerCase():"";
            let description = value.description? value.description.toLowerCase():"";
            return name.includes(searchParam)||description.includes(searchParam)
        });
        setFilteredRepo(temp);
    }

    function filterBy(filterType) {
        let temp;
        switch (filterType) {
            case 'Sources':
                temp = repo.filter(value => {
                    return !value.fork
                });
                break;
            case 'Forks':
                temp = repo.filter(value => {
                    return value.fork
                });
                break;
            case 'Archived':
                temp = repo.filter(value => {
                    return value.archived
                });
                break;
            case 'Mirrors':
                temp = repo.filter(value => {
                    return value.mirror_url!==null
                });
                break;
            default:
                temp = repo;
        }
        setFilteredRepo(temp);
    }

    return(
        <div className={'right-panel'}>
            <Tabs defaultIndex={1}>
                <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Repositories</Tab>
                    <Tab>Projects</Tab>
                </TabList>

                <TabPanel>
                    <h2>Overview</h2>
                </TabPanel>
                <TabPanel>
                    <Search filterBy={filterBy} searchBy={searchBy}/>
                    <hr/>
                    <RepoList repo={filteredRepo}/>
                </TabPanel>
                <TabPanel>
                    <h2>Projects</h2>
                </TabPanel>
            </Tabs>

        </div>
    );
}