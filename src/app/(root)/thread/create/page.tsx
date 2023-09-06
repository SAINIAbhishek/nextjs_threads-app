import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { GET_USER } from '@/lib/actions/user.actions';
import PostThread from '@/components/thread/post-thread';

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await GET_USER(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={userInfo._id} />
    </>
  );
}

export default Page;
