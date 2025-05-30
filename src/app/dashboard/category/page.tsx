import { getCreatedCategories } from "@/utils/getCategoriesFunctions";

import CommunityCategories from "./components/communityCategories/communityCategories";
import CreateCategories from "./components/createCategories";
import DeleteCategory from "./components/deleteCategories";

export default async function Page() {
  return (
    <section className="flex flex-wrap gap-5">
      <CommunityCategories />
      <CreateCategories />
      <DeleteCategory />
    </section>
  );
}
