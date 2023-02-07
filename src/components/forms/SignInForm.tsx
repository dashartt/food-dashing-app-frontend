import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import zod from "zod";

import useSessionState from "@/store/useSession";

import * as api from "../../services/api";
import * as utils from "../../utils";

const signUpSchema = zod.object({
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

export default function SignInForm() {
  const router = useRouter();
  const toast = useToast();
  const { path, setSession } = useSessionState();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (signupValues: SignupValues) => {
    api
      .signin({
        password: signupValues.password,
        phone: signupValues.phone.replace(/[^\d]/g, ""),
      })
      .then((data) => {
        if (!data.isSuccess) {
          toast({
            title: "Ops, ocorreu algum erro",
            description: data?.message,
            ...utils.toastOptions,
          });
        } else {
          setSession(data?.data?.session || null);
          setCookie("token", data?.data.token);
          const role = data?.data.session.role;
          const redirectByRole =
            role === "client" ? "/" : "/admin/orders/to-do";
          const isPathEmpty = path === "";
          router.push(isPathEmpty ? redirectByRole : path);
        }
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
        Entrar
      </Button>
    </form>
  );
}
