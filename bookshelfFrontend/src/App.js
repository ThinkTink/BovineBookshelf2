// Main component, contains routing to each page
import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
import Home from './Home';
import Bookshelf from './Bookshelf';
import Add from './Add';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    minHeight: '95vh',
    [theme.breakpoints.down('md')]: {
      minHeight: '87vh'
    },
  },
  content: {
    paddingBottom: '1rem'
  }
}));

export default function App() {
  const classes = useStyles();
  
  const [selectedTab, setSelectedTab] = useState(0);
  const tabClick = (event, index) => {
    setSelectedTab(index);
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>  
        <AppBar position="static" color="default">
          <Tabs
            variant="fullWidth"
            value={selectedTab}
            onChange={tabClick}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Home" component={Link} to="/"/>
            <Tab label="See the Books" component={Link} to="/bookshelf"/>
            <Tab label="Add a Book" component={Link} to="/add"/>
          </Tabs>
        </AppBar>

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/bookshelf' component={Bookshelf}/>
          <Route path='/add' component={Add}/>
        </Switch>

        <Footer/>
      </div>
    </div>
  )
};
