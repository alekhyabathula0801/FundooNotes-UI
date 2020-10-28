import React from "react";
import { IconButton } from "@material-ui/core";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import Tooltip from "@material-ui/core/Tooltip";

function ArchiveNote(props) {
  return (
    <Tooltip title="Archive" placement="bottom">
      <IconButton
        onClick={() => props.toogleArchiveNote()}
        className={props.buttonClassName}
      >
        <ArchiveOutlinedIcon className={props.iconClassName} />
      </IconButton>
    </Tooltip>
  );
}

export default ArchiveNote;
