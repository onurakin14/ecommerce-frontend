import React from "react";

type SkeletonLoaderProps = { keyValue: string, count: number };

function SkeletonLoader({ keyValue, count }: SkeletonLoaderProps) {

    return (
        <React.Fragment>
            {Array.from({ length: count }).map((_, i) => (
                <div key={`key-${keyValue}-${i}`}>
                    <div className="flex flex-col rounded-xl border border-gray-200 bg-background-light shadow-subtle animate-pulse">
                        <div className="w-full aspect-square rounded-t-xl bg-gray-200"></div>
                        <div className="p-4 space-y-4">
                            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                            <div className="h-4 w-1/3 rounded bg-gray-200"></div>
                            <div className="h-10 w-full rounded-lg bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
}

export default SkeletonLoader;