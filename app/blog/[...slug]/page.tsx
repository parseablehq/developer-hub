import { blogSource } from '@/lib/source';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string[];
  };
}

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
            const { authors } = require('@/lib/authors');
            const info = authors[page.data.author ?? ''];
            if (!info) return null;
            return (
              <>
                <img
                  src={info.avatar || "/avatars/generic.svg"}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover shrink-0 bg-gray-100"
                />
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
