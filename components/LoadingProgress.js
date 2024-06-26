import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import NProgress from 'nprogress';

import { useGlobal } from '@/hooks/useGlobal';

/**
 * 页面加载进度条
 */
export default function LoadingProgress() {
  const router = useRouter();
  const { onLoading } = useGlobal();
  const [isRouting, setIsRouting] = useState(false);

  // 路由变化
  useEffect(() => {
    const handleStart = () => {
      setIsRouting(true);
      NProgress.start();
      document.body.style.overflow = 'hidden';
    };

    const handleStop = () => {
      setIsRouting(false);
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeError', handleStop);
    router.events.on('routeChangeComplete', handleStop);

    return () => {
      document.body.style.overflow = '';
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
      document.body.style.overflow = '';
    };
  }, [router]);

  // 数据加载
  useEffect(() => {
    if (isRouting) return;

    if (onLoading) {
      NProgress.start();
      document.body.style.overflow = 'hidden';
    } else {
      NProgress.done();
      document.body.style.overflow = '';
    }
  }, [onLoading, isRouting]);
}
