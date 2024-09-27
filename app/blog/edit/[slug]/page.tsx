import { BlogEdit } from "@/components/blog/edit";
import { Header } from "@/components/layout/header";

export default function SpecificBlogHome({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <Header />
      <div className="sm:mt-10">
        <BlogEdit slug={params.slug} />
      </div>
    </>
  );
}
