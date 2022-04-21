import React from 'react';
import { NavLink, Route, RouteComponentProps, Switch } from 'react-router-dom';
import AccountOverviewContainer from '@/components/dashboard/AccountOverviewContainer';
import NavigationBar from '@/components/NavigationBar';
import DashboardContainer from '@/components/dashboard/DashboardContainer';
import AccountApiContainer from '@/components/dashboard/AccountApiContainer';
import { NotFound } from '@/components/elements/ScreenBlock';
import TransitionRouter from '@/TransitionRouter';
import SubNavigation from '@/components/elements/SubNavigation';
import { faKey, faCogs } from '@fortawesome/free-solid-svg-icons';
import tw, { TwStyle } from 'twin.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default ({ location }: RouteComponentProps) => (
    <>
        <NavigationBar/>
        {location.pathname.startsWith('/account') &&
        <SubNavigation>
            <div>
                <NavLink to={'/account'} exact><span><FontAwesomeIcon icon={faCogs} fixedWidth css={tw`mr-2 text-cyan-700`}/></span><span className="NavText">Settings</span></NavLink>
                <NavLink to={'/account/api'}><span><FontAwesomeIcon icon={faKey} fixedWidth css={tw`mr-2 text-cyan-700`}/></span><span className="NavText">API Keys</span></NavLink>
            </div>
        </SubNavigation>
        }
        <TransitionRouter>
            <Switch location={location}>
                <Route path={'/'} exact>
                    <DashboardContainer/>
                </Route>
                <Route path={'/account'} exact>
                    <AccountOverviewContainer/>
                </Route>
                <Route path={'/account/api'} exact>
                    <AccountApiContainer/>
                </Route>
                <Route path={'*'}>
                    <NotFound/>
                </Route>
            </Switch>
        </TransitionRouter>
    </>
);
