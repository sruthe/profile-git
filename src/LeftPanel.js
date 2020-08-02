import React, {Fragment, useEffect, useState} from "react";


export function LeftPanel() {
    const [userData, setUserData]=useState(null);
    useEffect(()=>{
        fetch('https://api.github.com/users/supreetsingh247')
            .then((res)=>{
                return res.json();
            })
            .then((res)=>{
                console.log(res);
                setUserData(res);
            })
            .catch((err)=>{
                console.log(err)
            });
    },[])

    return(
        <div className={'left-panel'}>
            {userData?
                <div>
                    <img src={userData.avatar_url} className={'avatar'}/>
                    <h2>{userData.name}</h2>
                    <p>{userData.login}</p>
                    <p>{userData.bio}</p>
                    <p>{userData.followers} followers · {userData.following} following · &#x2606; {userData.followers} </p>
                </div>
                :null
                }
        </div>
    );
}