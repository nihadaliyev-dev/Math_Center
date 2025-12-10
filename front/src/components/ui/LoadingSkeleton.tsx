import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded ${className}`}
    style={{ animation: "shimmer 1.5s infinite" }}
  />
);

export const NewsCardSkeleton: React.FC = () => (
  <div className="bg-card border border-border/60 rounded-lg overflow-hidden">
    <Skeleton className="w-full h-40" />
    <div className="p-4 flex gap-4">
      <div className="flex-shrink-0">
        <Skeleton className="w-12 h-12 rounded" />
      </div>
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </div>
);

export const NewsGridSkeleton: React.FC<{ count?: number }> = ({
  count = 8,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <NewsCardSkeleton key={index} />
    ))}
  </div>
);

export default Skeleton;
