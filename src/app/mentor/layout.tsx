import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MentorNavbar from '@/components/layout/MentorNavbar';

export default function MentorLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <MentorNavbar />
      <main className="pt-16">{children}</main>
    </ProtectedRoute>
  );
}
