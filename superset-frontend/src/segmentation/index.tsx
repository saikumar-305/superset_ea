/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import ErrorBoundary from 'src/components/ErrorBoundary';
import ToastContainer from 'src/components/MessageToasts/ToastContainer';
import dashboardRoutes from './segmentationRoutes';
import SegementationLanding from './components/segmentation-landing/SegmentationLanding';

export const App = () => {
  const [count, setCount] = React.useState(0);
  return (
    <BrowserRouter>
      <SegementationLanding />
      <Switch>
        {dashboardRoutes.map(({ path, Component }) => (
          <Route path={path} key={path}>
            <ErrorBoundary>
              <Component {...props} />
            </ErrorBoundary>
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
