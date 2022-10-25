import { Avatar } from "@components/avatar";
import { Button } from "@components/form/button";
import { Input } from "@components/form/input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostWrapper } from "./post-wrapper";

type Props = {
  address: string;
};

type FormData = {
  text: string;
};

export const NewPost = ({ address }: Props) => {
  const [newPostInputFocused, setNewPostInputFocused] = useState(false);
  const { handleSubmit, register, formState, reset } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  const handleCancel = () => {
    setNewPostInputFocused(false);
    reset();
  };

  return (
    <PostWrapper
      showLine={false}
      avatar={<Avatar name="Mark Jan Bonne Kordon" />}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
        <Input
          className="flex-1"
          placeholder={`Slå et opslag op for ${address}...`}
          minRows={2}
          multiline
          onFocus={() => setNewPostInputFocused(true)}
          {...register("text", {
            required: { value: true, message: "Du skal angive en tekst" },
          })}
          errorMessage={formState.errors.text?.message}
        />
        <div
          className={`flex max-h-0 gap-2 self-end overflow-hidden opacity-0 transition-all ${
            newPostInputFocused && "mt-2 !max-h-screen opacity-100"
          }`}
        >
          <Button variant="secondary" onClick={handleCancel}>
            Annuller
          </Button>
          <Button type="submit">Slå op</Button>
        </div>
      </form>
    </PostWrapper>
  );
};
