import React, {Fragment, useEffect, useState} from "react";
import moment from "moment";

const colors={
    'html':'#e34c26',
    'javascript':'#f1e05a',
    'css':'#563d7c'
}

export function RepoList(props) {
    const repo = props.repo;

    return(
        <Fragment>
            {repo.map((listItem)=>{
                let color;
                try {
                    color = colors[listItem.language.toLowerCase()];
                }catch (e) {
                    color='black'
                }
                let formattedDate = moment(listItem.updated_at).format('Do MMM YYYY');
               return <>
                <li style={{display:'flex', padding:'24px 5px'}}>
                   <div style={{display:'inline-block', width:'75%', textAlign:'left'}}>
                   <h3 style={{fontWeight:'600'}}>
                       <a href={listItem.svn_url} style={{color:'#0366d6', textDecoration:'none'}}>{listItem.name}</a>
                   </h3>
                   <p>{listItem.description}</p>
                       {listItem.language?
                           <><span><span style={{color:color}}>&#x25CF;</span> {listItem.language}</span> &nbsp;</>
                           :
                           null}
                           <span>{"Updated on "+formattedDate}</span>
                   </div>
                   <div>
                       <button>&#x2606; Star</button>
                   </div>
               </li>
                <hr></hr>
                </>
            })}
            {repo.length===0?
                <h4>supreetsingh247 doesn’t have any repositories that match.</h4>
                : null
            }
        </Fragment>
    );

}