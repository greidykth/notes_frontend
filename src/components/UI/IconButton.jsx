import React from "react";
import { faCirclePlus, faClose, faPen, faPlus, faPlusCircle, faPlusMinus, faPlusSquare, faSearch, faTrash,  } from "@fortawesome/free-solid-svg-icons";
import Icon from "./Icon"


const iconTypes = {
  edit: (color) => <Icon icon={faPen} css={`text-${color}-600`} />,
  delete: (color) => <Icon icon={faTrash} css={`text-${color}-600`} />,
  close: (color) => <Icon icon={faClose} css={`text-${color}-600`} />,
  add: (color) => <Icon icon={faCirclePlus} css={`text-${color}-600 w-6 h-6`} />,
  search: (color) => <Icon icon={faSearch} css={`text-${color}-600`} />,
};

const IconButton = ({ type, color = "blue", onClick, disabledButton }) => {
  if (disabledButton) color = "gray";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center py-1 px-2 mr-2 text-sm font-medium bg-gray-300 rounded-lg border border-gray-200 hover:bg-white hover:text-blue-800`}
      disabled={disabledButton}
    >
      {iconTypes[type](color)}
    </button>
  );
};

export default IconButton;
