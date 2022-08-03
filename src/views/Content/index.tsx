/*
 * @Author: yellowwenjie yellowwenjie@gmail.com
 * @Date: 2022-07-09 16:56:24
 * @LastEditors: yellowwenjie yellowwenjie@gmail.com
 * @LastEditTime: 2022-07-11 00:37:59
 * @FilePath: /前端/src/views/Content/index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by yellowwenjie yellowwenjie@gmail.com, All Rights Reserved.
 */
import React, {useContext} from "react";
import Box from "@mui/material/Box";
import BackGround from '../../components/background'
import Style from './content.module.scss'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import {ColorModeContext} from '../../components/theme/theme'
import {useTheme} from "@mui/material/styles";

function main() {
  const theme = useTheme().palette.mode;
  console.log(theme)
  const scrollDown = () => {
    window.scrollTo({
      behavior: "smooth",
      top: document.documentElement.clientHeight
    });
  }

  return (
    <Box sx={{height: "100vh"}} className={Style.root}>
      {/*背景*/}
      <BackGround/>
      <div className="scroll-down" onClick={scrollDown}>
        <KeyboardArrowDownOutlinedIcon/>
      </div>
      <Box style={{height: '100vh'}} bgcolor={theme === "light" ? "" : "black"}></Box>

    </Box>
  )
}

export default main;
