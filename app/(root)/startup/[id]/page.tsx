import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { formatDate } from "@/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Startup } from "@/sanity/types";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import Views from "@/app/components/Views";
import { Suspense } from "react";
import StartupCard, { StartupTypeCard } from "@/app/components/StartupCard";

export const experimental_ppr = true;
const md = markdownit();

export default async function Page({ params }: { params: Promise<{ id: string }>  }) {
  const id = (await params).id;
  // Fetch the post from Sanity (Server-Side)
  const post: any | null = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  //const { select: editorPosts } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: "editor-picks"});



  // parallel data fetching techniques
  // const [post, { select: editorPosts }] = await Promise.all([
  //   client.fetch(STARTUP_BY_ID_QUERY, { id }),
  //   client.fetch(PLAYLIST_BY_SLUG_QUERY, {
  //     slug: "editor-picks",
  //   }),
  // ]);

  if (!post) return notFound(); // Handle not found case

  const parsedContent = md.render(post?.pitch || ""); // Parse Markdown to HTML

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        {post.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
        src={post.image}
        alt="thumbnail"
        className="w-full h-auto rounded-xl"
      />
        )}

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            {post.author && (
              <>
                <Link href={`/user/${post.author._id}`} className="flex gap-2 items-center mb-3">
                  {post.author.image ? (
                    <>
                      <Image
                        key={post.author.image}
                        src={post.author.image}
                        alt="avatar"
                        width={64}
                        height={64}
                        className="rounded-full drop-shadow-lg"
                        priority
                      />
                      <div>
                        <p className="text-20-medium">{post.author.name}</p>
                        <p className="text-16-medium">@{post.author.username}</p>
                      </div>
                    </>
                  ) : (
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div> // Placeholder
                  )}
                </Link>
                <p className="category-tag">{post.category}</p>
              </>
            )}
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article className="prose max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{ __html: parsedContent }} />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {/* {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )} */}

        
        {/* Server Component */}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <Views id={id} />
        </Suspense>
      </section>
    </>
  );
}
