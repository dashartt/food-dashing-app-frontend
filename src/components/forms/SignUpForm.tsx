import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import zod from "zod";

import * as api from "../../services/api";
import * as utils from "../../utils";

const signUpSchema = zod.object({
  fullName: zod
    .string({
      required_error: "Digite seu nome completo",
    })
    .min(10, { message: "Campo obrigatório, digite seu nome completo" }),
  phone: zod
    .string({
      required_error: "Digite seu celular",
    })
    .min(11, { message: "Campo obrigatório, digite seu celular" }),
  password: zod
    .string({
      required_error: "Digite sua senha",
    })
    .min(5, {
      message: "Campo obrigatório e tem que ser maior que 5 caracteres",
    }),
});
type SignupValues = zod.TypeOf<typeof signUpSchema>;

type Props = {
  handleTabsChange: (index: number) => void;
};

export default function SignUpForm({ handleTabsChange }: Props) {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (signupValues: SignupValues) => {
    api
      .signup(signupValues)
      .then(() => {
        toast({
          title: "Conta criada",
          description: "Agora, entre com sua conta para continuar",
          ...utils.toastOptions,
        });
        handleTabsChange(1);
      })
      .catch((error) =>
        toast({
          title: "Ops, ocorreu algum erro",
          description: error.message,
          ...utils.toastOptions,
        })
      );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <FormControl isInvalid={!!errors.fullName}>
        <FormLabel htmlFor="fullName">Nome completo</FormLabel>
        <Input
          className="border border-gray-400 bg-gray-100 placeholder:text-gray-600"
          {...register("fullName")}
          id="fullName"
        />

        <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.phone}>
        <FormLabel htmlFor="phone">Celular</FormLabel>

        <Input
          as={InputMask}
          mask="(99) 99999-9999"
          className="border border-gray-400 bg-gray-100 placeholder:text-gray-600"
          {...register("phone")}
          id="phone"
        />

        <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="addressName">Senha</FormLabel>
        <Input
          className="border border-gray-400 bg-gray-100 placeholder:text-gray-600"
          {...register("password")}
          id="password"
          type="password"
        />

        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <Button type="submit" className="self-end bg-gray-800 text-white">
        Criar
      </Button>
    </form>
  );
}
