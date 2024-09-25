import { SpecificBlog } from "@/components/blog/specific";

export default function SpecificBlogHome({
  params,
}: {
  params: { id: string };
}) {
  return <SpecificBlog id={params.id} />;
}
