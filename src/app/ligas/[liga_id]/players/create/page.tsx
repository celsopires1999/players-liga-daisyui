import { CreatePlayer } from "../../../../frontend/features/create-player/components/CreatePlayer";

export const metadata = {
  title: "Create Player - Players Liga",
};

type CreatePlayerPageParams = {
  params: { liga_id: string };
};

export default function CreatePlayerPage({
  params: { liga_id },
}: CreatePlayerPageParams) {
  return <CreatePlayer liga_id={liga_id} />;
}
