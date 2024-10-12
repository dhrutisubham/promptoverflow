'use client';
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  // console.log(post);
  const {data:session}=useSession();
  const pathName=usePathname();
  const router=useRouter();

  const [copied, setCopied]=useState(null);
  const handleCopyText=()=>{
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=>{
      setCopied(null);
    }, 2000)

  }
  const handleProfileClick=()=>{
    // console.log(session.user.id);
    // console.log(post.creator.id);
    if(session?.user.id===post.creator._id)
      router.push(`/profile`)
    else
      router.push(`/profile/${post.creator._id}`)
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
          <Image
            src={post.creator.image}
            alt="User Profile Image"
            width={40}
            height={40}
            className="rounded-full object-contain"
            ></Image>

          <div className="flex flex-col font-satoshi">
            <h3 className=" font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-normal text-gray-600 text-xs">{post.creator.email}</p>
          </div>

        </div>
          <div className="copy_btn" onClick={()=>handleCopyText()}>
            <Image src={copied===post.prompt?`/assets/icons/tick.svg`:`/assets/icons/copy.svg`}
              height={16}
              width={16}
              alt="Copy Button"
            />
          </div>

      </div>
        <p className="my-4 font-satoshi text-md text-gray-700">{post.prompt} </p>
        <p className="my-4 font-inter cursor-pointer text-sm blue_gradient" onClick={handleTagClick && handleTagClick(post.tag)}>{post.tag} </p>

        {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <button
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}

    </div>
  )
}

export default PromptCard