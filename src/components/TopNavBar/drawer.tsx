import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";
import IconButton from "@mui/material/IconButton";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface IProps {
  Anchor: Anchor
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string }

}

export default function TemporaryDrawer(props: IProps) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({...state, [anchor]: open});
      };

  const list = (anchor: Anchor) => (
    <Box
      sx={{width: 250}}
      role="presentation"
    >
      <List>
        菜单栏
      </List>
      <Divider/>
      <List>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={props.Anchor}
        open={state[props.Anchor]}
        onClose={toggleDrawer(props.Anchor, false)}
      >
        {list(props.Anchor)}
      </Drawer>
      <IconButton onClick={toggleDrawer(props.Anchor, true)}>
        <props.Icon></props.Icon>
      </IconButton>

    </div>
  );
}
