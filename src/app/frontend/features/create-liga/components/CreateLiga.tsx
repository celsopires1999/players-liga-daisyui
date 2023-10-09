"use client";
import {
  TCreateLigaSchema,
  createLigaSchema,
} from "@/app/frontend/lib/types/create-liga";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CreateLigaOutput, createLiga } from "../actions/create-liga-action";
import { CreateLigaForm } from "./CreateLigaForm";

export function CreateLiga() {
  const methods = useForm<TCreateLigaSchema>({
    resolver: zodResolver(createLigaSchema),
  });
  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    setError,
  } = methods;

  const onSubmit = async (input: TCreateLigaSchema) => {
    const response = await createLiga(input);

    if (isError(response)) return;

    toast.success("liga created", {
      duration: 2000,
    });

    reset();
  };

  const isError = (response: CreateLigaOutput) => {
    if (response?.errorType === "field validation") {
      const errors = response?.error;
      if (typeof errors === "object" && "name" in errors) {
        setError("name", {
          type: "server",
          message: errors.name,
        });
      }
      toast.error("liga not created", {
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
    <CreateLigaForm
      back={() => router.back()}
      isSubmitting={isSubmitting}
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}
