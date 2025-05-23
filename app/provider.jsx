"use client"
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext';

export default function Provider({ children }) {
    const {user} = useUser();
    const [userDetail, setUserDetail] = useState();
    useEffect(() => {
        user && CreateNewUser();
    }, [user])
    const CreateNewUser = async() => {
        const result = await axios.post('/api/user', {
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress
        })
        console.log(result);
        setUserDetail(result.data);
    }
    return (
        <UserDetailContext.Provider value ={{userDetail, setUserDetail}}>
            <div>
            {children}
            </div>
        </UserDetailContext.Provider>
    )
}