import { useEffect, useState } from "react";
import { loadAllCategories } from "../services/category-service";
import { categoryListContext } from "./categoryContext";

export default function CategoryListProvider({ children }) {
  const [categories, setCategories] = useState();

  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <categoryListContext.Provider value={categories}>
      {children}
    </categoryListContext.Provider>
  );
}
