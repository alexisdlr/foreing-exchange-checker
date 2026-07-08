import { Skeleton } from "../ui/skeleton";

const ConverterSkeleton = () => {
  return (
    <div
      role="status"
      className="w-full h-full flex flex-col items-center justify-center "
    >
      <span className="sr-only">Loading converter</span>

      <div className="self-start mb-4">
        <Skeleton aria-hidden="true" className="w-40 h-8" />
        <span className="sr-only">Loading converter</span>
      </div>
      <div className="flex flex-col w-full h-full items-center justify-center bg-neutral-700 rounded-[20px] p-4">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
          {/* SEND BOX */}
          <div className="w-full md:w-auto md:flex-1 h-full bg-neutral-600 ring-1 ring-neutral-500 rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="self-start mb-2">
              <Skeleton aria-hidden="true" className="w-20 h-8" />
            </div>
            <div className="w-full h-10 flex items-center justify-between">
              <Skeleton
                aria-hidden="true"
                className="w-full h-full max-w-[180px] rounded-lg"
              />
              <Skeleton
                aria-hidden="true"
                className="w-full h-full max-w-[180px] rounded-lg"
              />
            </div>
          </div>

          {/* EXCHANGE BUTTON */}
          <div className=" w-full md:w-auto md:shrink-0 h-full flex items-center justify-center">
            <Skeleton aria-hidden="true" className="w-8 h-8 rounded-lg" />
          </div>

          {/* RECEIVE BOX */}
          <div className="w-full md:w-auto md:flex-1 h-full bg-neutral-600 rounded-lg p-4 flex flex-col items-center justify-center ring-1 ring-neutral-500">
            <div className="self-start mb-2">
              <Skeleton aria-hidden="true" className="w-20 h-8" />
            </div>
            <div className="w-full h-10 flex items-center justify-between">
              <Skeleton
                aria-hidden="true"
                className="w-full h-full max-w-[180px] rounded-lg"
              />
              <Skeleton
                aria-hidden="true"
                className="w-full h-full max-w-[180px] rounded-lg"
              />
            </div>
          </div>
        </div>
        <div
          className="w-full h-[1px] bg-neutral-500/50 mt-4"
          aria-hidden="true"
        ></div>
        {/* RATE BOX */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full rounded-lg mt-4">
          <div>
            <Skeleton aria-hidden="true" className="w-20 h-8" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Skeleton aria-hidden="true" className="w-24 h-8" />
            <Skeleton aria-hidden="true" className="w-24 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConverterSkeleton;
