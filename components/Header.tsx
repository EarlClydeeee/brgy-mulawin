import { getAuthNavState } from "@/lib/auth-nav";
import HeaderClient from "@/components/HeaderClient";

export default async function Header() {
  const auth = await getAuthNavState();

  return <HeaderClient auth={auth} />;
}
