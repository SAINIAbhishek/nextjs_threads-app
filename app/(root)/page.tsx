import { currentUser } from '@clerk/nextjs';
import { GET_USER } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { GET_POSTS } from '@/lib/actions/thread.actions';
import Pagination from '@/components/pagination';
import ThreadCard from '@/components/cards/thread-card';

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function Home({ searchParams }: Props) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await GET_USER(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const result = await GET_POSTS(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  return (
    <>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}
