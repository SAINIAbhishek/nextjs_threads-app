import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { GET_USER } from '@/lib/actions/user.actions';
import { GET_COMMUNITIES } from '@/lib/actions/community.actions';
import Searchbar from '@/components/search-bar';
import CommunityCard from '@/components/cards/community-card';
import Pagination from '@/components/pagination';

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function Page({ searchParams }: Props) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await GET_USER(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const result = await GET_COMMUNITIES({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <>
      <h1 className="head-text">Communities</h1>

      <div className="mt-5">
        <Searchbar routeType="communities" />
      </div>

      <section className="mt-9 flex flex-wrap gap-4">
        {result.communities.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path="communities"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}
