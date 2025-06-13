import { blogSource } from '@/lib/source';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { authors } from '@/lib/authors';

// Page params type is defined inline in the component

export function generateStaticParams() {
  return blogSource.getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string[] }>}) {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <article>
        <h1 className="text-4xl font-extrabold mb-4 text-[#0e141b]">{page.data.title}</h1>
        {page.data.description && (
          <p className="text-xl mb-8 text-[#4e7097] font-medium leading-relaxed">
            {page.data.description}
          </p>
        )}
        {page.data.date && (
          <div className="text-sm font-medium text-[#4e7097] mb-8">
            Published on {new Date(page.data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        )}
        <div className="prose dark:prose-invert max-w-none mb-8 prose-headings:text-[#0e141b] prose-headings:font-bold prose-p:text-[#0e141b] prose-p:text-lg prose-p:leading-relaxed prose-a:text-blue-600 prose-a:font-medium prose-li:text-[#0e141b] prose-li:text-lg prose-code:text-blue-700 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-800 prose-pre:text-slate-100 prose-pre:p-4 prose-pre:rounded-lg">
          {(() => {
            const MDXContent = page.data.body as React.ComponentType;
            return <MDXContent />;
          })()}
        </div>
      </article>
      {'author' in page.data && page.data.author && (
        <div className="mt-10 pt-6 border-t border-[#e7edf3]">
          <h3 className="text-sm font-medium text-[#4e7097] mb-4">WRITTEN BY</h3>
          <div className="flex items-center gap-4">
            {(() => {
              const info = authors[page.data.author ?? ''];
              if (!info) return null;
              return (
                <>
                  {info.avatar ? (
                    <Image
                      src={info.avatar || "/avatars/generic.svg"}
                      alt={`${info.name}'s avatar`}
                      width={64}
                      height={64}
                      className="rounded-full object-cover shrink-0 bg-[#e7edf3] border-2 border-white shadow-sm"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#e7edf3] flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-[#4e7097]">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-lg text-[#0e141b] m-0">{info.name}</p>
                    {info.title && <p className="text-sm text-[#4e7097] m-0">{info.title}</p>}
                    {info.bio && <p className="text-sm text-[#0e141b] mt-2 leading-relaxed">{info.bio}</p>}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
