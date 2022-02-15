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
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import { Router } from 'react-router-dom';
import history from 'src/ea_oyster_components/history';
import SegementationLanding from './components/segmentation-landing/SegmentationLanding';
import SegmentationDetails from './components/segmentation-details/SegmentationDetails';
import CreateEditSegmentContainer from './components/CreateEditSegmentContainer';
import VennDiagramContainer from './components/venn-diagrams/VennDiagramsContainer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
  return (
    <DndProvider backend={HTML5Backend} >
      <HashRouter>
        <Switch>
          <Route exact path="/" component={SegementationLanding} />
          <Route
            exact
            path="/details/:segmentID"
            component={SegmentationDetails}
          />
          <Route exact path="/edit/:segmentID" component={CreateEditSegmentContainer} />
          <Route exact path="/create" component={CreateEditSegmentContainer} />
          <Route exact path="/venn/:segmentIDs" component={VennDiagramContainer}} />
        </Switch>
      </HashRouter>
    </DndProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
