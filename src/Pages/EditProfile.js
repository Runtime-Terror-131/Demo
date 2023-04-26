import React, { useState, useEffect } from "react";
import ProfileTemplate from "./ProfileTemplate";
import { useJaneHopkins } from "../Config/Hopkins-Config";
import { Spinner } from "react-bootstrap";

export default function EditProfile() {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const { getUserInfo } = useJaneHopkins();
  useEffect(() => {
    setLoading(true);
    const localStorageData = localStorage.getItem("userData");
    if (localStorageData) {
      const { uid } = JSON.parse(localStorageData);
      getUserInfo(uid)
        .then((result) => {
          setUserInfo(result);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user info", error);
          setLoading(false);
        });
    }
  }, [getUserInfo]);
  return (
    <div>{userInfo ? <ProfileTemplate data={userInfo} /> : <Spinner />}</div>
  );
}
