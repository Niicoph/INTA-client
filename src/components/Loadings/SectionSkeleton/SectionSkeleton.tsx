import { Skeleton } from '@/components/ui/skeleton';

export default function SectionSkeleton() {
  return (
    <div className="flex flex-col  items-center w-full min-h-screen min-w-[350px] bg-background gap-4 p-4">
      <div className="w-full flex h-[2000px] flex-col gap-4 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl xl:h-[1000px] 2xl:max-w-[1600px]">
        <Skeleton className="rounded-md flex flex-col border border-border h-12 w-full" />
        <Skeleton className="rounded-md flex flex-col border border-border h-30 w-full" />
        <div className="grid grid-cols-1 gap-4 w-full h-full xl:flex">
          <Skeleton className="flex flex-col gap-4 h-full w-full xl:w-1/3 border border-border justify-between" />
          <Skeleton className="w-full  h-ffull xl:flex xl:flex-row xl:w-2/3 border border-border" />
        </div>
      </div>
    </div>
  );
}
