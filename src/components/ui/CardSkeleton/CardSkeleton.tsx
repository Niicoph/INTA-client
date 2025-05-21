import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="w-full flex items-stretch justify-between ">
      <div className="flex w-full p-4 justify-between items-stretch">
        <div className="w-full">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="w-full flex flex-col justify-between gap-1">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-30 items-end gap-1">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    </div>
  );
}
