import { getUserId } from "@/functions/user/getUserId";

export default async function UserPage() {
  const user = await getUserId();

  return (
    <h1>
      Your userid is <strong>{user}</strong>
    </h1>
  );
}
