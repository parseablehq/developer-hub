import { blogSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function BlogPage() {
  const pages = blogSource.getPages();
  
  if (!pages || pages.length === 0) {
    notFound();
  }

  // Sort pages by date (newest first)
  const sortedPages = [...pages].sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
    const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
    return dateB - dateA;
  });

  // Featured articles (first 3)
  const featuredArticles = sortedPages.slice(0, 3);
  
  // Recent posts (next 4 or all available)
  const recentPosts = sortedPages.slice(0, 4);
  
  // Popular posts (all posts for now, could be based on other metrics later)
  const popularPosts = sortedPages.slice(0, 3);

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto">
      {/* Hero Section */}
      <div className="@container">
        <div className="px-4 py-3">
          <div
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-slate-50 rounded-lg min-h-80"
            style={{
              backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url("/blog-hero.jpg")'
            }}
          >
            <div className="flex p-4">
              <p className="text-white tracking-light text-[28px] font-bold leading-tight">
                Exploring the Latest in Parseable Logging
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Featured Articles
      </h2>
      <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-stretch p-4 gap-3">
          {featuredArticles.map((page) => (
            <div key={page.slugs.join('/')} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex flex-col"
                style={{ backgroundImage: `url("/blog-placeholder.jpg")` }}
              ></div>
              <div>
                <Link href={`/blog/${page.slugs.join('/')}`} className="text-[#0e141b] text-base font-medium leading-normal hover:text-blue-600">
                  {page.data.title}
                </Link>
                <p className="text-[#4e7097] text-sm font-normal leading-normal">{page.data.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <h2 className="text-[#0e141b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Recent Posts
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {recentPosts.map((page) => (
          <div key={page.slugs.join('/')} className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg"
              style={{ backgroundImage: `url("/blog-placeholder.jpg")` }}
            ></div>
            <div>
              <Link href={`/blog/${page.slugs.join('/')}`} className="text-[#0e141b] text-base font-medium leading-normal hover:text-blue-600">
                {page.data.title}
              </Link>
              <p className="text-[#4e7097] text-sm font-normal leading-normal">{page.data.description}</p>
              {page.data.date && (
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(page.data.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="@container">
        <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[#0e141b] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
              Stay Updated
            </h1>
            <p className="text-[#0e141b] text-base font-normal leading-normal max-w-[720px]">
              Get the latest Parseable updates delivered straight to your inbox.
            </p>
          </div>
          <div className="flex flex-1 justify-center">
            <label className="flex flex-col min-w-40 h-14 max-w-[480px] flex-1 @[480px]:h-16">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <input
                  placeholder="Your email address"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e141b] focus:outline-0 focus:ring-0 border-none bg-[#e7edf3] focus:border-none h-full placeholder:text-[#4e7097] px-4 rounded-r-none border-r-0 pr-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                  defaultValue=""
                />
                <div className="flex items-center justify-center rounded-r-lg border-l-0 border-none bg-[#e7edf3] pr-2">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#176fd3] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span className="truncate">Subscribe</span>
                  </button>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
