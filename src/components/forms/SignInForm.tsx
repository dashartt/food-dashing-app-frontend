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
import { useForm } from "react-hook-form";
import zod from "zod";

import useShopSegmentURL from "@/hooks/shared/useShopSegmentURL";
import { signin } from "@/services/API/user.service";
import useAddressesState from "@/store/checkout/useAddresses";
import useSessionState from "@/store/useSession";

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
  const toast = useToast({ position: "top" });
  const { router, baseURL } = useShopSegmentURL();
  const { setSession } = useSessionState();
  const { setAddresses } = useAddressesState();
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
    })
      .then((response) => {
        toast({
          title: response.message,
        });

        setSession({
          _id: response.data?.user._id,
          fullName: response.data?.user.fullName || "",
          email: response.data?.user.email || "",
          role: response.data?.user.role || "",
        });

        if (response.data?.user.addresses) {
          setAddresses(response.data.user.addresses);
        }

        setCookie("token", response?.data?.token);

        const role = response?.data?.user?.role;

        if (role === "customer" && response.data) {
          router.push(baseURL);
        }
        if (role === "admin" && response.data) {
          router.push("/dashboard");
        }
      })
      .catch((error) =>
        toast({
          title: error.message,
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

      <Button
        type="submit"
        className="self-end bg-green-500 text-white hover:bg-green-300 active:bg-green-300"
      >
        Entrar
      </Button>
    </form>
  );
}
