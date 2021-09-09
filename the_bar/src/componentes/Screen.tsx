import React, { FC } from 'react';

//Material UI
import { makeStyles, ThemeProvider } from '@material-ui/styles';

import { theme } from '../theme';
import { ITheme } from '../interfaces';
const useStyles = makeStyles((theme: ITheme) => ({
  screen: {
    width: '1536px',
    height: '864px',
    border: '1px solid black' 
  }
}));

const  Screen:  FC = () => {
  const { screen } = useStyles();
  return (
   
       <ThemeProvider theme={theme}>
 <div className={screen}>
     </div>
       </ThemeProvider>
  
  );
}

export default Screen;
