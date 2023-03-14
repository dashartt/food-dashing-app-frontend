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
import zod from "zod";

import useSignParams from "@/hooks/shared/useSignParams";

import { signup } from "../../services/API/user.service";
import * as utils from "../../utils";

const signUpSchema = zod.object({
  fullName: zod
    .string({
      required_error: "Digite seu nome completo",
    })
    .min(10, { message: "Campo obrigatório, digite seu nome completo" }),
  email: zod
    .string({
      required_error: "Digite seu celular",
    })
    .email({ message: "Email inválido" }),
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
  setTabIndex: (tabIndex: number) => void;
};

export default function SignUpForm({ setTabIndex }: Props) {
  const toast = useToast();
  const { shopId, isAdmin } = useSignParams();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async ({ fullName, password, email }: SignupValues) => {
    signup({
      fullName,
      password,
      email,
      role: isAdmin ? "admin" : "customer",
      ...(shopId !== "" && { shopId }),
    })
      .then(() => {
        toast({
          title: "Conta criada",
          description: "Agora, entre com sua conta para continuar",
          ...utils.toastOptions,
        });
        setTabIndex(1);
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

      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email</FormLabel>

        <Input
          className="border border-gray-400 bg-gray-100 placeholder:text-gray-600"
          {...register("email")}
          id="email"
        />

        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
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
