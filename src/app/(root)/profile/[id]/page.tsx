import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { GET_USER } from '@/lib/actions/user.actions';
import ProfileHeader from '@/components/profile-header';
import { PROFILE_TABS } from '@/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import ThreadsTab from '@/components/threads-tab';

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await GET_USER(params.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {PROFILE_TABS.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                  {tab.value === 'threads' ? userInfo.threads.length : 0}
                </p>
              </TabsTrigger>
            ))}
          </TabsList>

          {PROFILE_TABS.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1">
              {tab.value === 'threads' && (
                <ThreadsTab currentUserId={user.id} accountId={userInfo.id} />
              )}
              {tab.value === 'replies' && <p>No replies to show.</p>}
              {tab.value === 'tagged' && <p>No tags to show.</p>}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
