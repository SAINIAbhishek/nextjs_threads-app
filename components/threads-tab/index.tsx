import ThreadCard from '../cards/thread-card';
import { UserThreadsType } from '@/types/user-type';
import { GET_COMMUNITY_POSTS } from '@/lib/actions/community.actions';
import { GET_USER_POSTS } from '@/lib/actions/user.actions';

type Props = {
  currentUserId: string;
  accountId: string;
  accountType?: 'User' | 'Community';
};

export default async function ThreadsTab({
  currentUserId,
  accountId,
  accountType = 'User',
}: Props) {
  let result: UserThreadsType;

  if (accountType === 'Community') {
    result = await GET_COMMUNITY_POSTS(accountId);
  } else {
    result = await GET_USER_POSTS(accountId);
  }

  return (
    <section className="mt-9 flex flex-col gap-10">
      {!result ? (
        <p className="no-result">No result!</p>
      ) : (
        <>
          {result.threads.map((thread) => (
            <ThreadCard
              key={thread._id}
              id={thread._id}
              currentUserId={currentUserId}
              parentId={thread.parentId}
              content={thread.text}
              author={
                accountType === 'User'
                  ? { name: result.name, image: result.image, id: result.id }
                  : {
                      name: thread.author.name,
                      image: thread.author.image,
                      id: thread.author.id,
                    }
              }
              community={
                accountType === 'Community'
                  ? { name: result.name, id: result.id, image: result.image }
                  : thread.community
              }
              createdAt={thread.createdAt}
              comments={thread.children}
            />
          ))}
        </>
      )}
    </section>
  );
}
