"use client";
import {
  TCreatePlayerSchema,
  createPlayerSchema,
} from "@/app/frontend/lib/types/create-player";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CreatePlayerForm } from "./CreatePlayerForm";
import {
  CreatePlayerOutput,
  createPlayer,
} from "../actions/create-player-action";

type CreatePlayerProps = {
  liga_id: string;
};

export function CreatePlayer({ liga_id }: CreatePlayerProps) {
  const methods = useForm<TCreatePlayerSchema>({
    resolver: zodResolver(createPlayerSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setError,
  } = methods;

  const router = useRouter();

  const onSubmit = async (input: TCreatePlayerSchema) => {
    const response = await createPlayer(input);

    if (isError(response)) return;

    toast.success("player created", {
      duration: 2000,
    });

    reset();
  };

  const isError = (response: CreatePlayerOutput) => {
    if (response?.errorType === "field validation") {
      const errors = response?.error;
      if (typeof errors === "object" && "name" in errors) {
        setError("name", {
          type: "server",
          message: errors.name,
        });
      }
      toast.error("player not created", {
        duration: 2000,
      });
      return true;
    }

    if (
      (response?.errorType === "database" ||
        response?.errorType === "server") &&
      typeof response.error === "string"
    ) {
      toast.error(response.error, {
        duration: 2000,
      });
      return true;
    }

    return false;
  };

  return (
    <CreatePlayerForm
      liga_id={liga_id}
      back={() => router.back()}
      isSubmitting={isSubmitting}
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
