import { SpecificBlog } from "@/components/blog/specific";
import { Header } from "@/components/layout/header";

export default function SpecificBlogHome({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <Header />
      <div className="sm:mt-10">
        <SpecificBlog id={params.id} />
      </div>
    </>
  );
}
