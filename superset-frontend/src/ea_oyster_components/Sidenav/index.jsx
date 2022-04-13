import React from 'react';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from '@trendmicro/react-sidenav';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useHistory } from 'react-router-dom';

const Sidenav = () => {
  const history = useHistory();
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: '#bd3030',
      }}
    >
      <SideNav
        onSelect={selected => {
          history.push(selected);
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="/superset/welcome">
            <NavIcon>
              <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>
          <NavItem eventKey="/superset/dashboard/1">
            <NavIcon>
              <i
                className="fa fa-fw fa-line-chart"
                style={{ fontSize: '1.75em' }}
              />
            </NavIcon>
            <NavText>VOCA Dashboard </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
};

export default Sidenav;
