
import ProfileInformationCard from "@/components/profile/ProfileInformationCard";
import TabbedContentArea from "@/components/profile/TabbedContentArea";
import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';

export default function ContributorProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <Suspense fallback={<Loading />}>
            <ProfileInformationCard />
          </Suspense>
        </div>
        <div className="lg:w-2/3">
          <TabbedContentArea />
        </div>
      </div>
    </div>
  );
}
