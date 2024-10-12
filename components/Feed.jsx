'use client';

import { useEffect, useState } from "react";
import PromptCardList from './PromptCardList'



const Feed = () => {
  const [prompts, setPrompts]=useState([]);
  // const [searchText, setSearchText]=useState("");
  useEffect(()=>{
    const fetchPrompts=async ()=>{
      const response= await fetch('/api/prompt');
      const data=await response.json();
      setPrompts(data);
    }
    fetchPrompts();
  }, [])

  const handleSearchChange=(e)=>{
    // setSearchText((prev)=>e.target.value);
  }


  return (
    <section className="feed">
      {/* <form className="relative w-full flex-center">
        <input 
        type="text"
        placeholder="Search for a tag or username..."
        onChange={handleSearchChange}
        value={searchText}
        required
        className="search_input peer"
        />
      </form> */}

      <PromptCardList
        data={prompts}
        handleTagClick={()=>{}}

      ></PromptCardList>
    </section>
  )
}

export default Feed