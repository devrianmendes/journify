"use client";
import { Badge } from "@/components/ui/badge";
import { CategoryType } from "@/types/categoryType";
import { getCreatedCategories } from "@/utils/getCategoriesFunctions";
import { useEffect, useState } from "react";

export default function Wrapper() {
  const [category, setCategory] = useState<CategoryType>([]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await getCreatedCategories();

      setCategory(data);
    };

    getData();
  }, [category]);
  return (
    <div className={`flex flex-wrap gap-3`}>
      {category!.map((eachCategory) => (
        <Badge
          style={{ backgroundColor: eachCategory.color }}
          key={eachCategory.id}
        >
          {eachCategory.name}
        </Badge>
      ))}
    </div>
  );
}
