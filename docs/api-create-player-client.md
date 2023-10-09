`api/create-player-client/route.tsx`

```typescript
import prisma from "@/app/lib/db/prisma";
import { isDuplicatedError } from "@/app/lib/db/uitls";
import { createPlayerSchema } from "@/app/lib/types/create-player";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body: unknown = await request.json();

  const result = createPlayerSchema.safeParse(body);
  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
    return NextResponse.json(
      { errorType: 1, errors: zodErrors },
      { status: 422 },
    );
  }

  try {
    await prisma.playerModel.create({
      data: {
        name: result.data.name,
        liga_id: result.data.liga_id,
      },
    });
  } catch (error) {
    if (isDuplicatedError(error)) {
      return NextResponse.json(
        {
          errorType: 2,
          message: `Player exists already with name ${result.data.name} in the liga ${result.data.liga_id}`,
        },
        { status: 422 },
      );
    }
    throw error;
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
```
