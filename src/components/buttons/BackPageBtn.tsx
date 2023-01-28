import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function BackPageBtn() {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  const backPage = () => router.back();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <IconButton
          className="text-3xl text-gray-700 bg-transparent"
          onClick={backPage}
          aria-label="Clique para voltar para página anterior"
          icon={<RiArrowLeftSLine />}
        />
      )}
    </>
  );
}
