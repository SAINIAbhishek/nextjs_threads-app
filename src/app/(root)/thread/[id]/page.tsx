import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import ThreadCard from '../../../../components/cards/thread-card';
import { GET_USER } from '@/lib/actions/user.actions';
import { GET_THREAD } from '@/lib/actions/thread.actions';
import CommentThread from '@/components/thread/comment-thread';

export const revalidate = 0;

type Props = {
  params: { id: string };
};

export default async function page({ params }: Props) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await GET_USER(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const thread = await GET_THREAD(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className="mt-7">
        <CommentThread
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}
