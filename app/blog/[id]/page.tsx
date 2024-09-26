import { SpecificBlog } from "@/components/blog/specific";

export default function SpecificBlogHome({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="sm:mt-10">
      <SpecificBlog id={params.id} />
    </div>
  );
}
