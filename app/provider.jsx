"use client";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";

export default function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState();
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  useEffect(() => {
    if (user) {
      CreateNewUser();
    }
  }, [user]);

  const CreateNewUser = async () => {
    try {
      const name = user?.fullName ?? "Anonymous";
      const email = user?.primaryEmailAddress?.emailAddress;

      console.log("Sending to backend:", { name, email });

      const result = await axios.post("/api/user", { name, email });
      console.log("Backend response:", result.data);

      setUserDetail(result.data);
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <SelectedChapterIndexContext.Provider value={{ selectedChapterIndex, setSelectedChapterIndex }}>
        <div>{children}</div>
      </SelectedChapterIndexContext.Provider>
    </UserDetailContext.Provider>
  );
}
