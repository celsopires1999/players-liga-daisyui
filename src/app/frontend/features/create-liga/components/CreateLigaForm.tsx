import { CommandButtons } from "@/app/frontend/components/CommandButtons";
import { InputField } from "@/app/frontend/components/InputField";
import { TCreateLigaSchema } from "@/app/frontend/lib/types/create-liga";
import { FormProvider, UseFormReturn } from "react-hook-form";

export type CreateLigaFormProps = {
  back: () => void;
  isSubmitting: boolean;
  methods: UseFormReturn<TCreateLigaSchema>;
  onSubmit: () => void;
};

export function CreateLigaForm({
  back,
  isSubmitting,
  methods,
  onSubmit,
}: CreateLigaFormProps) {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Create Liga</h1>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <InputField name="name" label="Name" placeholder="name" type="text" />
          <InputField
            name="imageUrl"
            label="Picture"
            placeholder="image URL"
            type="url"
          />
          <CommandButtons
            createLabel="Create Liga"
            isSubmitting={isSubmitting}
            onClick={back}
          />
        </form>
      </FormProvider>
    </div>
  );
}
