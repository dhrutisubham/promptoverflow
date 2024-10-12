"use client";

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {signIn, signOut, useSession, getProviders} from "next-auth/react"


const Nav = () => {

    const [isUserLoggedIn, setIsUserLoggedIn]=useState(true);
    const handleSignOut=()=>{
        const confirmationUser=confirm("Are you sure you want to Sign out?");
        if(confirmationUser)
            signOut();
    }

    const {data:session}= useSession();
    const [providers, setProviders]=useState(null);

    useEffect(()=>{
        const setUpProviders= async ()=>{
            const response= await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])


    const [toggleDownState, setToggleDownState]= useState(false);

    return (
    <nav className="flex-between w-full mb-16 pt-3 ">
        <Link href="/" className="flex gap-2 flex-center">
            <Image 
                src="/assets/images/logo.svg"
                width={30}
                height={30}
                className="object-contain"
                alt="Navigation Bar Logo"
            ></Image>
            <p className="logo_text">PromptOverFlow</p>
        </Link>

        {/* Desktop Navigation  */}
        <div className="sm:flex hidden">
            {(session?.user?(
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">Create Post</Link>
                    <button type="button" onClick={()=>handleSignOut()} className="outline_btn">Signout</button>
                    <Link href="/profile" className="border-b-neutral-700 border-2 rounded-full">
                        <Image
                        src={session?.user.image}
                        width={37}
                        height={37}
                        alt="Profile Picture"
                        className="rounded-full"></Image>
                    </Link>
                </div>
            ):(<> 
                {providers && Object.values(providers).map((provider)=>(
                    <button
                        type="button"
                        key={provider.name}
                        onClick={()=>{signIn(provider.id)}}
                        className="black_btn"
                    >
                        Sign In
                    </button>
                ))}
            
            </>))}
        </div>


        {/* Mobile Navigation  */}
        <div className="sm:hidden flex relative">
            {session?.user?(
                <>
                    <Image 
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className="object-contain rounded-full"
                        alt="Navigation Bar Logo"
                        onClick={()=>{setToggleDownState((prev)=>!prev)}}
                    ></Image>

                    { toggleDownState && (
                        <>
                            <div className="dropdown">
                                <Link 
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={()=>setToggleDownState(false)}
                                >My Profile</Link>

                                <Link 
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={()=>setToggleDownState(false)}
                                >Create Post</Link>
                                <button type="button" onClick={()=>{
                                    handleSignOut();
                                    setToggleDownState(false);
                                }} className="black_btn mt-5 w-full">Signout</button>

                            </div>
                        </>
                    )}
                </>
            ):(
                <>
                    {providers && Object.values(providers).map((provider)=>(
                    <button
                        type="button"
                        key={provider.name}
                        onClick={()=>{signIn(provider.id)}}
                        className="black_btn"
                    >
                        Sign In
                    </button>
                ))}
                </>
            )}

        </div>
    </nav>
    )
}

export default Nav