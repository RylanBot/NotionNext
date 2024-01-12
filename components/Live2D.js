/* eslint-disable no-undef */
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useEffect } from 'react'

/**
 * 网页动画
 * @returns
 */
export default function Live2D() {
  const { theme, switchTheme } = useGlobal()
  const showPet = JSON.parse(siteConfig('WIDGET_PET'))
  const petLink = siteConfig('WIDGET_PET_LINK')

  useEffect(() => {
    if (showPet) {
      const script = document.createElement('script');
      script.src = '/js/live2d.min.js';
      script.onload = () => {
        try {
          if (typeof window?.loadlive2d !== 'undefined') {
            loadlive2d('live2d', petLink);
          }
        } catch (error) {
          console.error('读取 PET 模型失败:', error);
        }
      };
      script.onerror = () => {
        console.error('无法加载脚本 /live2d.min.js');
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [theme]);

  function handleClick() {
    if (JSON.parse(siteConfig('WIDGET_PET_SWITCH_THEME'))) {
      switchTheme()
    }
  }

  if (!showPet) {
    return <></>
  }

  return (
    <canvas id="live2d"
      width="250" height="250"
      onClick={handleClick}
      className="cursor-grab"
      onMouseDown={(e) => e.target.classList.add('cursor-grabbing')}
      onMouseUp={(e) => e.target.classList.remove('cursor-grabbing')}
    />
  )
}
