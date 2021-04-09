import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../Header/Header';
import Mode7 from '../Mode7/Mode7';

export interface IStateSidebar {
  open: boolean;
}

const App: React.FC = () => {

  const sidebarInitialState = {
    open: true
  }

  const [sidebarState, setSidebarState] = useState({
    ...sidebarInitialState
  })

  const toggleSidebar = () => {
    setSidebarState((prevstate) => ({open: !prevstate.open}))
  }

  return (
    <div className="App">
      <Header sidebarState={sidebarState} toggleSidebar={toggleSidebar}/>
      <Mode7 sidebarState={sidebarState}/>
    </div>
  );
}

export default App;
