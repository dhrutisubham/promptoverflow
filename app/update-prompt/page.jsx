'use client';

import Form from "@components/Form"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
const UpdatePrompt = () => {

  const {data:session}=useSession();
  const router=useRouter();
  const searchParams=useSearchParams();
  
  const [submitting, setSubmitting]=useState(false);
  const [post, setPost]= useState(
    {
      prompt: '',
      tag: ''
    }
  )

  const promptId=searchParams.get('id');

  useEffect(()=>{
    const fetchCurrentPost= async ()=>{
        const response=await fetch(`/api/prompt/${promptId}`);
        const data=await response.json();

        setPost({
            prompt: data.prompt,
            tag: data.tag
        });
    }
    if(promptId){
        fetchCurrentPost();
    }
  }, [promptId])
  
  const updatePrompt=async(e)=>{
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response= await fetch(`/api/prompt/${promptId}`, 
        {
          method: "PATCH",
          body:JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            userId: session?.user.id
          })
        }
      );
      if(response.ok){
        router.push('/profile');
      }
      else{
        console.error("Error in updating prompt");

      }
      
    } catch (error) {
      console.error(error);
    }
    finally{
      setSubmitting(false);
    }

  }

  return (
    <>
      <Form
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
      type={`Update`}      
      ></Form>
    </>
  )
}

export default UpdatePrompt