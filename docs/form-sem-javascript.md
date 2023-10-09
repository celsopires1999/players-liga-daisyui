### Versão do form sem javascript

`[liga_id]/create-player/page.tsx`

```typescript
import { redirect } from "next/navigation";
import { FormSubmitButton } from "../../../components/FormSubmitButton";
import prisma from "../../../lib/db/prisma";

export const metadata = {
  title: "Create player - Players Liga",
};

async function createPlayer(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString();
  const liga_id = formData.get("liga_id")?.toString();
  if (!name || !liga_id) {
    throw new Error("name and liga are required");
    // return;
  }
  await prisma.playerModel.create({
    data: {
      name,
      liga_id,
    },
  });
  redirect("/");
  // revalidatePath("/[liga_id]/create-player");
  // return;
}

type CreatePlayerPageParams = {
  params: { liga_id: string };
};

export default function CreatePlayerPage({
  params: { liga_id },
}: CreatePlayerPageParams) {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Create Player</h1>
      <form action={createPlayer}>
        <input name="liga_id" type="hidden" defaultValue={liga_id} />
        <input
          required
          name="name"
          placeholder="name"
          className="input input-bordered mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">Create Player</FormSubmitButton>
      </form>
    </div>
  );
}

```

`app/components/FormSubmitButton.tsx`

```typescript
"use client";

import React, { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      type="submit"
      disabled={pending}
      className={`btn btn-primary ${className}`}
    >
      {pending && <span className="loading loading-spinner loading-xs"></span>}
      {children}
    </button>
  );
}

```
