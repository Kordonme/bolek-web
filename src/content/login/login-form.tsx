import { Button } from "@components/form/button";
import { Input } from "@components/form/input";
import { IconArrowRight } from "@tabler/icons";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

type Props = {
  onSuccess: (email: string) => void;
};

export const LoginForm = ({ onSuccess }: Props) => {
  const [email, setEmail] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const response = await signIn("email", {
      email,
      redirect: false,
    });

    if (response?.ok && !response.error) {
      onSuccess(email);
    }
  };

  return (
    <>
      <p>Velkommen! Login eller opret en ny konto.</p>
      <form onSubmit={handleLogin} className="flex w-full flex-col gap-4">
        <Input
          variant="large"
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button size="lg" type="submit">
          Log ind
          <IconArrowRight />
        </Button>
      </form>
    </>
  );
};
