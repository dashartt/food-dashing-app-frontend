import {
  Card,
  CardBody,
  HStack,
  Icon,
  Skeleton,
  VStack,
} from "@chakra-ui/react";
import { MdArrowForwardIos } from "react-icons/md";

export default function ShopCardSkeleton() {
  return (
    <Card className="w-full max-w-xs bg-white" variant="outline">
      <CardBody>
        <HStack className="justify-between">
          <VStack className="items-start space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-36" />
          </VStack>

          <Icon as={MdArrowForwardIos} className="text-gray-400" />
        </HStack>
      </CardBody>
    </Card>
  );
}
