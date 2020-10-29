import React from "react";
import { IconButton } from "@material-ui/core";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import Tooltip from "@material-ui/core/Tooltip";

function PinNote(props) {
  return (
    <Tooltip title="Pin note" placement="bottom">
      <IconButton onClick={() => props.tooglePinNote()}>
        {!props.isPined ? (
          <BookmarkBorderOutlinedIcon className={props.pinClassName} />
        ) : (
          <BookmarkOutlinedIcon
            className={props.pinClassName}
          ></BookmarkOutlinedIcon>
        )}
      </IconButton>
    </Tooltip>
  );
}

export default PinNote;
