import UserLayoutWrapper from "@/components/UserLayoutWrapper";
import { UserContentContainer } from "@/styles/components/User.styles";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default async function UserLayout({ children }: UserLayoutProps) {
  return (
    <>
      <UserLayoutWrapper>
        <UserContentContainer>{children}</UserContentContainer>
      </UserLayoutWrapper>
    </>
  );
}
