import { Card } from "@components/card/card";
import { Button } from "@components/form/button";
import { Input } from "@components/form/input";
import { Page } from "@components/page";
import { trpc } from "@utils/trpc";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const NewHomeownerPage: NextPage = () => {
  const { register, formState, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const { mutate: addHomeowner } = trpc.homeowner.addHomeowner.useMutation({
    onSuccess: () => {
      router.push("/homeowners");
    },
  });

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    addHomeowner({
      currentOrganizationId: "cl9vua1d20000c3bstcp99god",
      ...formData,
    });
  };

  return (
    <div>
      <Head>
        <title>Ny beboer</title>
      </Head>

      <Page title="Ny beboer">
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Fornavn"
              {...register("firstName", {
                required: { value: true, message: "Du skal angive et fornavn" },
              })}
              errorMessage={formState.errors.firstName?.message}
            />
            <Input
              label="Efternavn"
              {...register("lastName")}
              errorMessage={formState.errors.lastName?.message}
            />
            <Input
              type="email"
              label="E-mail"
              {...register("email", {
                required: false,
                validate: (value) => value === "",
                pattern: {
                  value: /\S+@\S+/,
                  message: "Du skal angive en gyldig e-mail",
                },
              })}
              errorMessage={formState.errors.email?.message}
            />
            <Input
              type="text"
              label="Mobil nr."
              {...register("phone")}
              errorMessage={formState.errors.phone?.message}
            />
            <Button type="submit">Gem</Button>
          </form>
        </Card>
      </Page>
    </div>
  );
};

export default NewHomeownerPage;
