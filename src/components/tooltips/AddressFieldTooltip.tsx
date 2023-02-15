import { IconButton, Tooltip } from "@chakra-ui/react";
import { BsQuestionCircle as InfoIcon } from "react-icons/bs";

type Props = {
  label: string;
  fieldName: string;
};

export default function AddressFieldTooltip({ label, fieldName }: Props) {
  return (
    <Tooltip
      hasArrow
      placement="top"
      label={label}
      aria-label="mensagem para ajudar em caso de dúvida"
    >
      <IconButton
        className="bg-transparent"
        aria-label={`ver detalhes do campo ponto de ${fieldName}`}
        icon={<InfoIcon className="text-xl" />}
      />
    </Tooltip>
  );
}
