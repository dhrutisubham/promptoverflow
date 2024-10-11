'use client';

import Form from "@components/Form"
import { useState } from "react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const CreatePrompt = () => {

  const {data:session}=useSession();
  const [post, setPost]= useState(
    {
      prompt: '',
      tag: ''
    }
  )
  const router=useRouter();
  
  const [submitting, setSubmitting]=useState(false);
  
  const createPrompt=async(e)=>{
    e.preventDefault();
    setSubmitting(true);
    
    
    try {
      const response= await fetch('/api/prompt/new', 
        {
          method: "POST",
          body:JSON.stringify({
            prompt: post.prompt,
            tag: post.tag,
            userId: session?.user.id
          })
        }
      );
      if(response.ok){
        router.push('/');
      }
      else{
        console.error("Error in creating a post");

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
      handleSubmit={createPrompt}
      type={"Create"}


      
      ></Form>
    </>
  )
}

export default CreatePrompt