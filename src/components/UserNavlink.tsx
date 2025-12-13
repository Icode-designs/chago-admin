import { FlexBox } from "@/styles/components/ui.Styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartArea, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link href={href} className={active ? "active" : ""}>
      <FlexBox $gap={10}>
        {children === "Dashboard" ? (
          <FaChartArea />
        ) : children === "Edit Profile" ? (
          <IoIosSettings />
        ) : children === "Manage Orders" ? (
          <FaCartShopping />
        ) : (
          <FaUser />
        )}

        {children}
      </FlexBox>
    </Link>
  );
}
