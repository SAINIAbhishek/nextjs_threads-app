'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { DeleteThreadType } from '@/types/thread-type';
import { DELETE_THREAD } from '@/lib/actions/thread.actions';

export default function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: DeleteThreadType) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === '/') return null;

  const handleClick = async () => {
    await DELETE_THREAD(JSON.parse(threadId), pathname);

    if (!parentId || !isComment) {
      router.push('/');
    }
  };

  return (
    <Image
      src="/assets/delete.svg"
      alt="Delete thread"
      width={18}
      height={18}
      className="cursor-pointer object-contain"
      onClick={handleClick}
    />
  );
}
