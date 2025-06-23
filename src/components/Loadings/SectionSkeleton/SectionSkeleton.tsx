import { Skeleton } from '@/components/ui/skeleton';

export default function SectionSkeleton() {
  return (
    <div className="flex flex-col  items-center w-full min-h-screen min-w-[350px] bg-background gap-4 p-4">
      <div className="w-full flex h-full flex-col justify-center items-center gap-4 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-[1400px]">        
        <Skeleton className="rounded-md flex flex-col border border-border h-12 w-full" />
        <div className="h-full w-full gap-4 grid xl:grid-cols-2 xl:h-[720px] 2xl:h-[640px] overflow-hidden ">
          <Skeleton className="rounded-md flex-1 border border-border" />
          <Skeleton className="rounded-md flex-1 border border-border" />
        </div>
      </div>
    </div>
  );
}
