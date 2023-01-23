import { Card, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function MenuItemCardSkeleton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {" "}
      {mounted && (
        <VStack className="w-full">
          {Array(4)
            .fill(null)
            .map(() => (
              <Card
                key={uuid()}
                variant="outline"
                className="rounded-none w-full p-6"
              >
                <Skeleton className="w-40 h-4" />
                <SkeletonText
                  className="mt-4"
                  noOfLines={2}
                  skeletonHeight={4}
                />
                <Skeleton className="w-16 h-4 mt-6" />
              </Card>
            ))}
        </VStack>
      )}{" "}
    </>
  );
}
