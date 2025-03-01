import React from 'react';

const MessageSkeleton = () => {
    return (
        <div className='w-[100%] h-[80%] flex flex-col gap-4 px-[3%]'>

            {/* Left */}
            <div className="flex w-52 flex-col gap-4 self-start">
                <div className="flex items-center gap-4">
                    <div className="skeleton h-12 w-12 shrink-0 rounded-full animate-pulse"></div> {/* Circle */}
                    <div className="flex flex-col gap-2">
                        <div className="skeleton h-3 w-28 animate-pulse"></div>{/* Lines */}
                        <div className="skeleton h-3 w-28 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="flex w-52 flex-col gap-4 self-end">
                <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="skeleton h-12 w-12 shrink-0 rounded-full animate-pulse"></div> {/* Circle */}
                    <div className="flex flex-col gap-2">
                        <div className="skeleton h-3 w-28 animate-pulse"></div>{/* Lines */}
                        <div className="skeleton h-3 w-28 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Left */}
            <div className="flex w-52 flex-col gap-4 self-start">
                <div className="flex items-center gap-4">
                    <div className="skeleton h-12 w-12 shrink-0 rounded-full animate-pulse"></div> {/* Circle */}
                    <div className="flex flex-col gap-2">
                        <div className="skeleton h-3 w-28 animate-pulse"></div>{/* Lines */}
                        <div className="skeleton h-3 w-28 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="flex w-52 flex-col gap-4 self-end">
                <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="skeleton h-12 w-12 shrink-0 rounded-full animate-pulse"></div> {/* Circle */}
                    <div className="flex flex-col gap-2">
                        <div className="skeleton h-3 w-28 animate-pulse"></div>{/* Lines */}
                        <div className="skeleton h-3 w-28 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Left */}
            <div className="flex w-52 flex-col gap-4 self-start">
                <div className="flex items-center gap-4">
                    <div className="skeleton h-12 w-12 shrink-0 rounded-full animate-pulse"></div> {/* Circle */}
                    <div className="flex flex-col gap-2">
                        <div className="skeleton h-3 w-28 animate-pulse"></div>{/* Lines */}
                        <div className="skeleton h-3 w-28 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="flex w-52 flex-col gap-4 self-end">
                <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="skeleton h-12 w-12 shrink-0 rounded-full animate-pulse"></div> {/* Circle */}
                    <div className="flex flex-col gap-2">
                        <div className="skeleton h-3 w-28 animate-pulse"></div>{/* Lines */}
                        <div className="skeleton h-3 w-28 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Left */}
            <div className="flex w-52 flex-col gap-4 self-start">
                <div className="flex items-center gap-4">
                    <div className="skeleton h-12 w-12 shrink-0 rounded-full animate-pulse"></div> {/* Circle */}
                    <div className="flex flex-col gap-2">
                        <div className="skeleton h-3 w-28 animate-pulse"></div>{/* Lines */}
                        <div className="skeleton h-3 w-28 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div className="flex w-52 flex-col gap-4 self-end">
                <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="skeleton h-12 w-12 shrink-0 rounded-full animate-pulse"></div> {/* Circle */}
                    <div className="flex flex-col gap-2">
                        <div className="skeleton h-3 w-28 animate-pulse"></div>{/* Lines */}
                        <div className="skeleton h-3 w-28 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Left */}
            <div className="flex w-52 flex-col gap-4 self-start">
                <div className="flex items-center gap-4">
                    <div className="skeleton h-12 w-12 shrink-0 rounded-full animate-pulse"></div> {/* Circle */}
                    <div className="flex flex-col gap-2">
                        <div className="skeleton h-3 w-28 animate-pulse"></div>{/* Lines */}
                        <div className="skeleton h-3 w-28 animate-pulse"></div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MessageSkeleton;
