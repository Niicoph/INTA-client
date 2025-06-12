import { Skeleton } from '@/components/ui/skeleton';

export default function SectionSkeleton() {
  return (
    <div className="h-full w-full flex flex-col gap-4 overflow-hidden">
      <Skeleton className="rounded-md flex flex-col border border-border h-32" />
      <div className="h-full w-full gap-4 grid xl:grid-cols-2 xl:h-[720px] 2xl:h-[640px] overflow-hidden ">
        <Skeleton className="rounded-md flex-1 border border-border" />
        <Skeleton className="rounded-md flex-1 border border-border" />
      </div>
    </div>
  );
}
