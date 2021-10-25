import { Modal } from "@mui/material";
import { Box } from "@mui/system";

import { useAppDispatch } from "../../redux/hooks";
import { closeModel } from "../../store/gist.reducer";

import "./style.css";

const CustomModal = ({ show, repoData }: any) => {
  const dispatch = useAppDispatch();
  return (
    <Modal
      open={show}
      onClose={() => {
        dispatch(closeModel());
      }}
    >
      <Box className="modal-container">
        <div className="modal-body">
          <div>
          <div id="open-modal" className={`modal-window ${show ? "modal-window-open" : ""}`}>
            <div>
              <a 
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(closeModel());
                }} 
                title="Close" 
                className="modal-close">Close</a>
              <h1>{repoData.owner.login}</h1>
              <div>{repoData.owner.html_url}</div>
              <div><small>Check out</small></div>
              <a href={repoData.owner.url} target="_blank">{repoData.owner.url}</a>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomModal;
