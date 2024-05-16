import { siteConfig } from '@/lib/config';
import { useGlobal } from '@/hooks/useGlobal';

import TravellingsLink from '@/components/TravellingsLink';

import CONFIG from '../config';
import { MenuItemDrop } from './MenuItemDrop';

export const MenuListTop = (props) => {
  const { customNav, customMenu, navDisplayed } = props;
  const { locale } = useGlobal();

  let links = [
    { id: 1, icon: 'fa-solid fa-house', name: locale.NAV.INDEX, to: '/', show: siteConfig('HEXO_MENU_INDEX', null, CONFIG) },
    { id: 2, icon: 'fas fa-search', name: locale.NAV.SEARCH, to: '/search', show: siteConfig('HEXO_MENU_SEARCH', null, CONFIG) },
    { id: 3, icon: 'fas fa-archive', name: locale.NAV.ARCHIVE, to: '/archive', show: siteConfig('HEXO_MENU_ARCHIVE', null, CONFIG) }
    // { icon: 'fas fa-folder', name: locale.COMMON.CATEGORY, to: '/category', show: siteConfig('MENU_CATEGORY', null, CONFIG) },
    // { icon: 'fas fa-tag', name: locale.COMMON.TAGS, to: '/tag', show: siteConfig('MENU_TAG', null, CONFIG) }
  ];

  if (customNav) {
    links = links.concat(customNav);
  }

  for (let i = 0; i < links.length; i++) {
    if (links[i].id !== i) {
      links[i].id = i;
    }
  }

  // 如果 开启自定义菜单，则覆盖Page生成的菜单
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu;
  }

  if (!links || links.length === 0) {
    return null;
  }

  return (
    <>
      <nav id='nav-pc' className='leading-8 justify-center w-full flex'>
        {links?.map((link, index) => link && link.show && <MenuItemDrop key={index} link={link} />)}
        <span className='pl-4 pr-2'> <TravellingsLink hidden={navDisplayed} /></span>
      </nav>
    </>
  );
};
