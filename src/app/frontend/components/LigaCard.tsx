import { LigaModel } from "@prisma/client";
import Link from "next/link";
import { NewLigaTag } from "./NewLigaTag";
import Image from "next/image";

export type LigaCardProps = {
  liga: LigaModel;
};

export function LigaCard({ liga }: LigaCardProps) {
  return (
    <Link
      href={"/ligas/" + liga.id}
      className="card w-full bg-base-100 transition-shadow hover:shadow-xl "
    >
      <figure>
        <Image
          src={liga.imageUrl}
          alt={liga.name}
          width={800}
          height={400}
          className="h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{liga.name}</h2>
        <NewLigaTag createdAt={liga.createdAt} />
      </div>
    </Link>
  );
}
