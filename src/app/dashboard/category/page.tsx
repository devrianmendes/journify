import CommunityCategories from "./components/communityCategories/communityCategories";
import CreateCategories from "./components/createCategories";
import DeleteCategory from "./components/deleteCategories";

export default async function Page() {
  return (
    <section className="flex flex-col gap-5">
      <CommunityCategories />
      <div className="flex flex-col xl:flex-row gap-5">
        <CreateCategories />

        <DeleteCategory />
      </div>
    </section>
  );
}
