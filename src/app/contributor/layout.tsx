import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ContributorNavbar from '@/components/layout/ContributorNavbar';

export default function ContributorLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <ContributorNavbar />
      <main className="pt-16">{children}</main>
    </ProtectedRoute>
  );
}
