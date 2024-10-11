import { useEffect, useState } from "react";
import { loadAllCategories } from "../services/category-service";
import { categoryListContext } from "./categoryContext";
import { toast } from "react-toastify";

export default function CategoryListProvider({ children }) {
  const [categories, setCategories] = useState();

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        toast.error("Something wrong");
      });
  }, []);
  return (
    <categoryListContext.Provider value={categories}>
      {children}
    </categoryListContext.Provider>
  );
}
