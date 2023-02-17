import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function BackPageBtn() {
  const router = useRouter();

  const backPage = () => router.back();

  return (
    <IconButton
      className="text-3xl text-gray-700 bg-transparent lg:hidden"
      onClick={backPage}
      aria-label="Clique para voltar para página anterior"
      icon={<RiArrowLeftSLine />}
    />
  );
}
