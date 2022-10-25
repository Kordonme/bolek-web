import { VerifyForm } from "@content/login/verify-form";
import { LoginLayout } from "@layouts/login-layout";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoginForm } from "../content/login/login-form";
import { Page } from "./_app";

const LoginPage: Page = () => {
  const { query } = useRouter();
  const [email, setEmail] = useState("");
  const callbackUrl = String(query.callbackUrl ?? "/homes");

  const handleLoginSuccess = (loginEmail: string) => {
    setEmail(loginEmail);
  };

  return (
    <div className="flex flex-col items-center gap-6 md:min-w-[400px]">
      <div className="text-4xl font-bold">Log ind</div>
      {email ? (
        <VerifyForm callbackUrl={callbackUrl} email={email} />
      ) : (
        <LoginForm onSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

LoginPage.getLayout = (children) => <LoginLayout>{children}</LoginLayout>;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return { props: {} };
};

export default LoginPage;
