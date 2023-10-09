export const metadata = {
  title: "Liga - Players Liga",
};

type LigaPageParams = {
  params: { liga_id: string };
};

export default function LigaPage({ params: { liga_id } }: LigaPageParams) {
  return <h1>Welcome to liga: {liga_id}</h1>;
}
