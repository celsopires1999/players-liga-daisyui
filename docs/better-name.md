`[liga_id]/create-player-server/page.tsx`

```typescript
import { CreatePlayerServerForm } from "@/app/features/CreatePlayerServerForm";

export const metadata = {
  title: "Create player - Players Liga",
};

type CreatePlayerPageParams = {
  params: { liga_id: string };
};

export default function CreatePlayerPage({
  params: { liga_id },
}: CreatePlayerPageParams) {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Create Player Server</h1>
      <CreatePlayerServerForm liga_id={liga_id} />
    </div>
  );
}

```

`src/app/feature/CreatePlayerServerForm.tsx`

```typescript
"use client";

import { createPlayerSchema } from "@/app/lib/types/create-player";
import toast from "react-hot-toast";
import {
  CreatePlayerOutput,
  createPlayer,
} from "../actions/create-player-action";

export type CreatePlayerServerFormProps = {
  liga_id: string;
};

export function CreatePlayerServerForm({
  liga_id,
}: CreatePlayerServerFormProps) {
  const clientAction = async (formData: FormData) => {
    const newPlayer = {
      // name: formData.get("name"),
      name: formData.get("name"),
      liga_id: formData.get("liga_id"),
    };

    const parsedInput = createPlayerSchema.safeParse(newPlayer);

    if (!parsedInput.success) {
      // instead of formating the message manually try:
      // parsedInput.error.format()
      // parsedInput.error.flatten()

      let errorMessage = "";
      parsedInput.error.issues.forEach((issue) => {
        errorMessage =
          errorMessage + issue.path[0] + ": " + issue.message + ". ";
      });

      toast.error(errorMessage, {
        duration: 2000,
      });
      return;
    }

    const response = await createPlayer(parsedInput.data);

    if (isError(response)) return;

    toast.success("player created", {
      duration: 2000,
    });
  };

  const isError = (response: CreatePlayerOutput) => {
    if (response?.errorType === "field validation") {
      const errors = response?.error;
      if (typeof errors === "object" && "name" in errors) {
        const errorMessage = `name: ${errors.name}`;
        toast.error(errorMessage, {
          duration: 2000,
        });
      }

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
    <form action={clientAction}>
      <input name="liga_id" type="hidden" defaultValue={liga_id} />
      <input
        required
        name="name"
        placeholder="name"
        className="input input-bordered mb-3 w-full"
      />
      <button
        type="submit"
        disabled={false}
        className="btn btn-primary btn-block"
      >
        {false && <span className="loading loading-spinner loading-xs"></span>}
        Create Player
      </button>
    </form>
  );
}

```
