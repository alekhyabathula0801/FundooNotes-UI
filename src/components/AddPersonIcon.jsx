import React, { useState } from "react";
import { IconButton } from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Collaborator from "./Collaborator";

function AddPersonIcon(props) {
  const [collaboratorPopup, setCollaboratorPopup] = useState(false);

  let closeCollaboratorPopup = () => {
    setCollaboratorPopup(false);
  };

  let openCollaboratorPopup = () => {
    setCollaboratorPopup(true);
  };

  return (
    <>
      <Tooltip title="Collaborator" placement="bottom">
        <IconButton
          className={props.buttonClassName}
          onClick={() => openCollaboratorPopup()}
        >
          <PersonAddOutlinedIcon className={props.iconClassName} />
        </IconButton>
      </Tooltip>
      <Collaborator
        collaboratorPopup={collaboratorPopup}
        closeCollaboratorPopup={closeCollaboratorPopup}
        addCollaborator={props.addCollaborator}
      />
    </>
  );
}

export default AddPersonIcon;
