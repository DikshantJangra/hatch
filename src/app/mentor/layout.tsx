import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
