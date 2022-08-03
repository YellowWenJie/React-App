/*
 * @Author: yellowwenjie yellowwenjie@gmail.com
 * @Date: 2022-07-09 16:31:38
 * @LastEditors: yellowwenjie yellowwenjie@gmail.com
 * @LastEditTime: 2022-07-11 00:38:48
 * @FilePath: /前端/src/components/TopNavBar/index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by yellowwenjie yellowwenjie@gmail.com, All Rights Reserved.
 */
import React, {useState} from "react";
import Box from "@mui/material/Box";
import Style from './TopNavBar.module.scss'
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {SetTheme} from "../theme/theme";
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import IconButton from "@mui/material/IconButton";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import Drawer from "./drawer";

interface ItemProps {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string }
  Text?: string
}

const Item = (props: ItemProps) => {
  const {Icon, Text = ""} = props
  return (
    <Button size="large" startIcon={<Icon/>} color="inherit">{Text}</Button>
  )
}

function main() {

  return (
    <Box className={Style.root} sx={{width: '100%'}}>
      <Grid container spacing={2}>
        <Grid container
              direction="row"
              justifyContent="flex-start"
              alignItems="baseline"
              item
              xs={4}
        >
          <Button size="large" color="inherit">黄文杰</Button>
        </Grid>
        <Grid container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              item
              sx={{display: {sm: 'flex', xs: 'none'}}}
              xs={8}
        >
          <Item Text={'搜索'} Icon={SearchIcon}/>
          <Item Text={'发现'} Icon={ExploreOutlinedIcon}/>
          <Item Text={'留言'} Icon={MessageIcon}/>
          <Item Text={'登录'} Icon={AccountCircleIcon}/>
          <SetTheme></SetTheme>
        </Grid>
        <Grid container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              item
              sx={{display: {sm: 'none', xs: 'flex'}}}
              xs={8}
        >
          <IconButton>
            <SearchIcon/>
          </IconButton>
          <Drawer Anchor={"right"} Icon={MenuOpenOutlinedIcon}/>
          <SetTheme></SetTheme>
        </Grid>
      </Grid>
    </Box>
  );
}

export default main;
