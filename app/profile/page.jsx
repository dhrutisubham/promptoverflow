"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const profile = () => {
    const [prompts, setPrompts]=useState([]);
    const {data:session}=useSession();
    const router=useRouter();

    useEffect(()=>{
        const fetchPrompts=async ()=>{
          const response= await fetch(`/api/users/${session?.user?.id}/posts`);
          const data=await response.json();
          setPrompts(data);
        }
        if(session?.user.id) fetchPrompts();
      }, [session?.user.id])

    const handleEdit=(post)=>{
      router.push(`/update-prompt?id=${post._id}`);
    }
    const handleDelete= async (post)=>
    {
      const hasConfirmed=confirm("Are you sure you want to delete this post?");
      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE'
          })

          const filteredPosts= await prompts.filter((p)=>p._id !== post._id);
          setPrompts(filteredPosts);
        } catch (error) {
          console.error("Deleting post failed!");
        }
      }

    }

  return (
    <>
        {
            session && (
                <Profile
                    name={"My"}
                    desc="Welcome to your profile page!"
                    data={prompts}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                
                ></Profile>
            )
        }
    
    </>
  )
}

export default profile