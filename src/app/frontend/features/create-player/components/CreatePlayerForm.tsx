import { CommandButtons } from "@/app/frontend/components/CommandButtons";
import { InputField } from "@/app/frontend/components/InputField";
import { TCreatePlayerSchema } from "@/app/frontend/lib/types/create-player";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { SelectField } from "./SelectField";

type CreatePlayerFormProps = {
  liga_id: string;
  back: () => void;
  isSubmitting: boolean;
  methods: UseFormReturn<TCreatePlayerSchema>;
  onSubmit: () => void;
};

export function CreatePlayerForm({
  liga_id,
  back,
  isSubmitting,
  methods,
  onSubmit,
}: CreatePlayerFormProps) {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Create Player</h1>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <InputField name="name" label="Name" placeholder="name" type="text" />
          <InputField
            name="imageUrl"
            label="Picture"
            placeholder="image URL"
            type="url"
          />
          <SelectField name="position" />
          <InputField name="liga_id" type="hidden" defaultValue={liga_id} />
          <CommandButtons
            createLabel="Create Player"
            isSubmitting={isSubmitting}
            onClick={back}
          />
        </form>
      </FormProvider>
    </div>
  );
}
