"use client";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc/trpcClient";

export default function Wrapper() {
  // const [category, setCategory] = useState<CategoryType>([]);

  const { data } = trpc.category.getCreatedCategories.useQuery();
  
  return (
    <div className={`flex flex-wrap gap-3`}>
      {data ? (
        data.data.map((eachCategory) => (
          <Badge
            style={{ backgroundColor: eachCategory.color }}
            key={eachCategory.id}
          >
            {eachCategory.name}
          </Badge>
        ))
      ) : (
        <p>Sem categorias criadas.</p>
      )}
    </div>
  );
}
