import React, { Fragment, useEffect } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';

import { navigations } from '../../navigations';
import { MatxVerticalNav } from 'src/ea_oyster_components/matx';
import { setLayoutSettings } from 'src/ea_oyster_components/redux/actions/LayoutActions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { getDynamicNavigationByUser } from 'src/ea_oyster_components/redux/actions/NavigationAction';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  scrollable: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  sidenavMobileOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100vw',
    background: 'rgba(0, 0, 0, 0.54)',
    zIndex: -1,
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));

const Sidenav = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { settings } = useSelector(state => state.layout);
  const { navs } = useSelector(state => state.navigations);

  const updateSidebarMode = sidebarSettings => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    dispatch(
      setLayoutSettings({
        ...settings,
        [activeLayoutSettingsName]: {
          ...activeLayoutSettings,
          leftSidebar: {
            ...activeLayoutSettings.leftSidebar,
            ...sidebarSettings,
          },
        },
      }),
    );
  };

  // Uncomment this if you want to load the navigations dynamically.
  useEffect(() => {
    console.log('useeffect in sidenav');
    dispatch(getDynamicNavigationByUser());
  }, []);

  return (
    <Fragment>
      <Scrollbar
        options={{ suppressScrollX: true }}
        className={clsx('relative px-4', classes.scrollable)}
      >
        {children}
        <MatxVerticalNav navigation={navigations} />
      </Scrollbar>

      <div
        onClick={() => updateSidebarMode({ mode: 'close' })}
        className={classes.sidenavMobileOverlay}
      />
    </Fragment>
  );
};

export default Sidenav;
