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
    <div className="container py-8">

      <article className="prose dark:prose-invert max-w-none mb-0">
        <h1 className="text-3xl font-bold mb-4">{page.data.title}</h1>
        {page.data.description && (
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
            {page.data.description}
          </p>
        )}
        {page.data.date && (
          <div className="text-sm text-gray-500 mb-8">
            Published on {new Date(page.data.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        )}
        {(() => {
          const MDXContent = page.data.body as React.ComponentType;
          return <MDXContent />;
        })()}
      </article>
      {'author' in page.data && page.data.author && (
        <div className="mt-6 flex items-center gap-2 border-t pt-4">
          {(() => {
            const info = authors[page.data.author ?? ''];
            if (!info) return null;
            return (
              <>
                {info.avatar ? (
                  <Image
                    src={info.avatar || "/avatars/generic.svg"}
                    alt={`${info.name}'s avatar`}
                    width={48}
                    height={48}
                    className="rounded-full object-cover shrink-0 bg-gray-100"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-400">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                  </div>
                )}
                <div className="leading-tight">
                  <p className="font-medium text-base m-0">{info.name}</p>
                  {info.title && <p className="text-xs text-gray-500 m-0">{info.title}</p>}
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
