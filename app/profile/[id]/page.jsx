"use client";

import { useState, useEffect } from "react";
import Profile from "@components/Profile";

const profile = ({params}) => {
    const [prompts, setPrompts]=useState([]);
    const [name, setName]=useState("");
    const userId=params.id;

    useEffect(()=>{
        const fetchPrompts=async ()=>{
          const response= await fetch(`/api/users/${userId}/posts`);
          const response_name= await fetch(`/api/users/${userId}`);

          const data=await response.json();
          const dataName=await response_name.json();
          setPrompts(data);
          setName(dataName.name);
          // console.log(dataName);
        }
        if(userId) fetchPrompts();
      }, [userId])



  return (
    <>
      <Profile
          name={name}
          desc="Welcome to your profile page!"
          data={prompts}
      
      ></Profile>
    </>
  )
}

export default profile