import { type ReactNode } from "react";

interface WithSkeletonProps {
  isLoading: boolean;
  skeleton: ReactNode;
  children: ReactNode;
}

export const WithSkeleton = ({
  isLoading,
  skeleton,
  children,
}: WithSkeletonProps) => {
  return <>{isLoading ? skeleton : children}</>;
};
