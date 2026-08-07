import { NextResponse, type NextRequest } from 'next/server';

/**
 * Temporary compatibility for the two-deployment base-path migration.
 *
 * The existing website proxy removes `/docs` before forwarding requests. The
 * migrated app serves `/docs` natively. Accept the old upstream paths until the
 * website deployment is switched to preserve the prefix.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // NextURL separates a configured base path from `pathname`, so this is the
  // reliable way to distinguish `/docs/architecture` from `/architecture`.
  if (request.nextUrl.basePath === '/docs') {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.pathname = `/docs${pathname === '/' ? '' : pathname}`;

  return NextResponse.rewrite(destination);
}
