import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function ContributorLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
