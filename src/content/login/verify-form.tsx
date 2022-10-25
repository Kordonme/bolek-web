import { Alert } from "@components/alert";
import { Button } from "@components/form/button";
import { Input } from "@components/form/input";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";

type Props = {
  email: string;
  callbackUrl: string | null;
};

export const VerifyForm = ({ email, callbackUrl }: Props) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleVerify = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        setError(false);
        const response = await axios.post(
          `/api/auth/callback/email?email=${encodeURIComponent(
            email
          )}&token=${encodeURIComponent(code)}&${
            callbackUrl ? `callbackUrl=${callbackUrl}` : ""
          }`
        );

        router.push(response.request.responseURL);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    },
    [callbackUrl, code, email, router]
  );

  return (
    <>
      <p>Indtast koden du har fået tilsendt på din e-mail.</p>

      {error && <Alert>Der opstod en fejl med den indtastede kode!</Alert>}

      <form onSubmit={handleVerify} className="flex w-full flex-col gap-4">
        <Input
          type="text"
          variant="large"
          placeholder="Code"
          name="code"
          className="input-no-arrows !px-0 text-center text-3xl tracking-widest"
          onChange={(e) => setCode(e.target.value)}
        />
        <Button size="lg" type="submit">
          Godkend
        </Button>
      </form>
    </>
  );
};
