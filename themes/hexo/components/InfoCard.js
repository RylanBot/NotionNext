import { useRouter } from 'next/router';

import LazyImage from '@/components/LazyImage';
import { siteConfig } from '@/lib/config';

import Card from './Card';
import MenuGroupCard from './MenuGroupCard';
import SocialButton from './SocialButton';

/**
 * 社交信息卡
 * @param {*} props
 * @returns
 */
export function InfoCard(props) {
  const { className, siteInfo } = props;

  const router = useRouter();
  const pathname = router.pathname;
  const specialPath = ['/tag', '/archive', '/category'];
  const specialClass = specialPath.includes(pathname) ? 'md:pt-14' : '';

  return (
    <div className={specialClass}>
      <Card className={className}>
        <div
          className='justify-center items-center flex py-6 dark:text-gray-100  transform duration-200 cursor-pointer'
          onClick={() => {
            router.push('/');
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <LazyImage src={siteInfo?.icon} className='rounded-full' width={120} alt={siteConfig('AUTHOR')} />
        </div>
        <div className='font-medium text-center text-xl pb-4'>{siteConfig('AUTHOR')}</div>
        <div className='text-sm text-center mb-2'>{siteConfig('BIO')}</div>
        <MenuGroupCard {...props} />
        <SocialButton />
      </Card>
    </div>
  );
}
