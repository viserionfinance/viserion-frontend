import BigNumber from 'bignumber.js'
import {DatePickerPortal} from 'components/DatePicker'
import useEagerConnect from 'hooks/useEagerConnect'
import React, {lazy, useState} from 'react'
import {Redirect, Route, Router, Switch} from 'react-router-dom'
import {usePollBlockNumber} from 'state/block/hooks'
import {usePollCoreFarmData} from 'state/farms/hooks'
import {ResetCSS} from 'uikit'
import EasterEgg from './components/EasterEgg'
import PageLoader from './components/Loader/PageLoader'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import {ToastListener} from './contexts/ToastsContext'
import history from './routerHistory'
import GlobalStyle from './style/Global'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './views/AddLiquidity/redirects'
// Views included in the main bundle
import Pools from './views/Pools'
import RedirectOldRemoveLiquidityPathStructure from './views/RemoveLiquidity/redirects'
import Swap from './views/Swap'
import {RedirectPathToSwapOnly, RedirectToSwap} from './views/Swap/redirects'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Nft = lazy(() => import('./views/Nft'))
const NotFound = lazy(() => import('./views/NotFound'))
const AddLiquidity = lazy(() => import('./views/AddLiquidity'))
const Liquidity = lazy(() => import('./views/Pool'))
const RemoveLiquidity = lazy(() => import('./views/RemoveLiquidity'))
const Ido = lazy(() => import('./views/Ido'))

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  usePollBlockNumber()
  useEagerConnect()
  usePollCoreFarmData()

  const [isOpenModal, setIsOpenModal] = useState<any>(true);

  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/treasure">
              <Pools />
            </Route>
            {/*<Route path="/referral">*/}
            {/*  <Referral />*/}
            {/*</Route>*/}
            <Route path="/nft">
              <Nft />
            </Route>
            <Route path="/ido">
              <Ido />
            </Route>
            {/* Using this format because these components use routes injected props. We need to rework them with hooks */}
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/liquidity" component={Liquidity} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact path="/create" component={AddLiquidity} />
            <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

            {/* Redirect */}
            <Route path="/pool">
              <Redirect to="/liquidity" />
            </Route>
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/syrup">
              <Redirect to="/pools" />
            </Route>
            <Route path="/presale">
              <Redirect to="/ido" />
            </Route>
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
      <DatePickerPortal />
      {/*<ModalPreSale isOpen={isOpenModal} setIsOpen={setIsOpenModal} />*/}
    </Router>
  )
}

export default React.memo(App)
