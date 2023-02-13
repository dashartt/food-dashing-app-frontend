import { HStack, Skeleton, SkeletonCircle } from "@chakra-ui/react";

export default function PizzeriaLogoSkeleton() {
  return (
    <HStack className="ml-2 space-x-4">
      <SkeletonCircle size="14" />
      <Skeleton height="14" width="40" />
    </HStack>
  );
}
