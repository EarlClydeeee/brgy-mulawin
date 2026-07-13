import { logout } from "@/app/actions/auth";
import { IconLogout } from "@/components/icons";

export function LogoutButton({
  className,
  label = "Logout",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <form action={logout}>
      <button type="submit" className={className}>
        <IconLogout className="h-4 w-4" />
        {label}
      </button>
    </form>
  );
}
