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
// import InputMask from "react-input-mask";
import zod from "zod";

import useSignParams from "@/hooks/shared/useSignParams";
import { signin } from "@/services/API/user.service";
import useSessionState from "@/store/useSession";

import * as utils from "../../utils";

const signUpSchema = zod.object({
  email: zod
    .string({
      required_error: "Digite seu email",
    })
    .email({ message: "Formato de email inválido" }),
  password: zod
    .string({
      required_error: "Digite sua senha",
    })
    .min(5, {
      message: "Campo obrigatório e tem que ser maior que 5 caracteres",
    }),
});
type SignInValues = zod.TypeOf<typeof signUpSchema>;

export default function SignInForm() {
  const router = useRouter();
  const { shopId } = useSignParams();
  const toast = useToast();
  const { path, setSession } = useSessionState();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (values: SignInValues) => {
    signin({
      email: values.email,
      password: values.password,
      ...(shopId !== "" && { shopId }),
    })
      .then((response) => {
        setSession({
          ...response?.data?.user,
        });
        setCookie("token", response?.data.token);

        const role = response?.data.user.role;
        if (role === "admin" && path.startsWith("")) router.push("/dashboard");
        // const role = response?.data.user.role;
        // const redirectByRole = role === "client" ? "/" : "/admin/orders/to-do";
        // const isPathEmpty = path === "";

        // router.push(isPathEmpty ? redirectByRole : path);
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
        <FormLabel htmlFor="password">Senha</FormLabel>
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
