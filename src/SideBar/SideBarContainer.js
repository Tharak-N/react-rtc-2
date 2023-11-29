import { useMediaQuery } from 'react-responsive';
import './SideBarContainer.css'
import SideBarView from './SideBarView/SideBarView';

export default function SideBarContainer({ height, width }){
  const sideBarMode = true;

  const isMobile = useMediaQuery({ maxWidth: 767 })
  const isTab = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
  const isLGDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isXLDesktop = useMediaQuery({ minWidth: 1440 });

  const panelPadding = 8;
  const sideViewPanelHeight = height - panelPadding * 3.5; 
  const panelHeader = isMobile ? 6 : isTab ? 8 : isLGDesktop ? 10 : isXLDesktop ? 12 : 0;

  return (
    <>
      { 
        sideBarMode ? (
          isMobile || isTab ? (
            <></>
          ) : (
            <SideBarView
              height={sideViewPanelHeight}
              width={width}
              panelPadding={panelPadding}
              panelHeader={panelHeader}
            />
          )
        ) : null
      }
    </>
  );
}