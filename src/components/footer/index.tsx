'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDEBAR_LINKS } from '@/constants';
import { useCallback } from 'react';

export default function Footer() {
  const pathname = usePathname();

  const isActive = useCallback(
    (route: string) =>
      (pathname.includes(route) && route.length > 1) || pathname === route,
    [pathname]
  );

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {SIDEBAR_LINKS.map((link) => {
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`bottombar_link ${
                isActive(link.route) && 'bg-primary-500'
              }`}>
              <Image
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className="object-contain"
              />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
