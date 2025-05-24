import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Callout } from 'fumadocs-ui/components/callout';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { APIPage } from 'fumadocs-openapi/ui';
import { openapi } from './lib/source'; 
import type { MDXComponents } from 'mdx/types';

// This function provides MDX components for rendering MDX content
export function getMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    // Include all default Fumadocs MDX components
    ...defaultMdxComponents,
    
    // Explicitly include the components we need
    Callout,
    Card,
    Cards,
    APIPage: (props) => <APIPage {...openapi.getAPIPageProps(props)} />,
    
    // Override any components if needed
    // For example, you could customize the appearance of certain HTML elements
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    img: (props) => <ImageZoom {...(props as any)} />,

    // Include any custom components passed in
    ...components,
  };
}
