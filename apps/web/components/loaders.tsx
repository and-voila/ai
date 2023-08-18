import { Skeleton } from 'ui';

import { Divider } from './divider';

export function PageLinksLoader() {
  return (
    <Divider
      position="left"
      className="space-y-2 pl-8 before:bg-primary before:opacity-80 after:bg-primary after:opacity-70"
    >
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </Divider>
  );
}

export function GridListItemLoader() {
  return (
    <Divider
      position="left"
      className="pl-8 before:bg-primary before:opacity-80 after:bg-primary after:opacity-70"
    >
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </Divider>
  );
}

export function MDXListLoader() {
  return (
    <Skeleton className="flex h-64 flex-col justify-between rounded p-6 transition hover:bg-muted sm:p-8" />
  );
}

export function ListItemLoader() {
  return (
    <Divider className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </Divider>
  );
}

export function ArticleLoader() {
  const loadingItems = Array.from({ length: 10 });
  return (
    <div className="space-y-2">
      {loadingItems.map((_i, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </div>
  );
}

export function FormLoader() {
  const loadingItems = Array.from({ length: 4 });
  return (
    <div className="space-y-2">
      {loadingItems.map((_i, index) => (
        <Skeleton key={index} className="h-14 w-full" />
      ))}
    </div>
  );
}

export function PricingTitleLoader() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </div>
  );
}

export function PricingTierLoader() {
  const loadingItems = Array.from({ length: 2 });
  return (
    <div className="flex flex-col justify-center  sm:flex-row sm:space-x-8 sm:space-y-0">
      {loadingItems.map((_i, index) => (
        <div
          className="flex flex-col justify-between space-y-4 rounded border p-2"
          key={index}
        >
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      ))}
    </div>
  );
}
