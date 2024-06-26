import LazyImage from '@/components/LazyImage';
import { siteConfig } from '@/lib/config';
import MenuGroupCard from './MenuGroupCard';
import { MenuListSide } from './MenuListSide';

/**
 * 移动端侧边菜单
 */
const SideBar = (props) => {
  const { siteInfo } = props;
  return (
    <div id="lawn-side-bar">
      <div className="h-52 w-full flex justify-center">
        <div>
          <div className="flex justify-center items-center py-6 dark:text-gray-100">
            <LazyImage src={siteInfo?.icon} className="rounded-full" width={80} alt={siteConfig('AUTHOR')} />
          </div>
          <MenuGroupCard {...props} />
        </div>
      </div>
      <MenuListSide {...props} />
    </div>
  );
};

export default SideBar;
