import { LigaCard } from "@/app/frontend/components/LigaCard";
import prisma from "@/app/frontend/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function LigasPage() {
  const ligas = await prisma.ligaModel.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={ligas[0].imageUrl}
            alt={ligas[0].name}
            width={400}
            height={400}
            className=" w-full max-w-xs rounded-lg shadow-2xl"
            priority
          />
          <div>
            <h1 className="text-5xl font-bold">{ligas[0].name}</h1>
            <Link href={"/ligas/" + ligas[0].id} className="btn btn-primary">
              Go to Liga
            </Link>
          </div>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ligas.slice(1).map((liga) => (
          <LigaCard liga={liga} key={liga.id} />
        ))}
      </div>
    </div>
  );
}
