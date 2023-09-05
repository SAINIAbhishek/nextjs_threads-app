import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { GET_USER } from '@/lib/actions/user.actions';
import PostThread from '@/components/post-threads';

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  // get organization list created by user
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
