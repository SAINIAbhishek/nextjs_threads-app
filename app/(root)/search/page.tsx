import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import { GET_USER, GET_USERS } from '@/lib/actions/user.actions';
import Pagination from '@/components/pagination';
import Searchbar from '@/components/search-bar';
import UserCard from '@/components/cards/user-card';

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export default async function Page({ searchParams }: Props) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await GET_USER(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  const result = await GET_USERS({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <Searchbar routeType="search" />

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>

      <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}
