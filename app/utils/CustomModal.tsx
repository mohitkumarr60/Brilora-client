import React, { FC } from "react";
import { Modal, Box } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute w-[95%] sm:w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl">
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  );
};

export default CustomModal;
