import { redirect } from 'next/navigation';
import { GET_USER_POSTS } from '@/lib/actions/user.actions';
import ThreadCard from '../cards/thread-card';
import { UserThreadsType } from '@/types/user-type';

type Props = {
  currentUserId: string;
  accountId: string;
  accountType?: 'USER' | 'COMMUNITY';
};

export default async function ThreadsTab({
  currentUserId,
  accountId,
  accountType = 'USER',
}: Props) {
  const result: UserThreadsType = await GET_USER_POSTS(accountId);

  if (!result) {
    redirect('/');
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === 'USER'
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={
            accountType === 'COMMUNITY'
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
}
