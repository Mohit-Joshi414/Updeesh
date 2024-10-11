import React, { useEffect, useState } from "react";
import { categoryContext } from "./categoryContext";
import { getPostsTitleByCategory } from "../services/post-service";
import { toast } from "react-toastify";

export default function CategoryProvider({ children }) {
  const [postContent, setPostContent] = useState();

  useEffect(() => {
    getPostsTitleByCategory()
      .then((data) => {
        setPostContent(data);
      })
      .catch((err) => {
        toast.error("Error in loading posts");
      });
  }, []);
  return (
    <categoryContext.Provider value={postContent}>
      {children}
    </categoryContext.Provider>
  );
}
