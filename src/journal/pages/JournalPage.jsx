import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../view"
import { AddOutlined } from "@mui/icons-material"

export const JournalPage = () => {
  return (
      <JournalLayout>
        {/* <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident temporibus asperiores cupiditate eaque a ipsa optio? Incidunt reprehenderit quisquam distinctio optio adipisci animi laboriosam dolores! Tenetur reiciendis maiores dignissimos exercitationem.</Typography> */}

        {/* Nothing Selected */}
        <NothingSelectedView />

        {/* Note view */}
        {/* <NoteView /> */}

        <IconButton
          size="large"
          sx={{
            color: "white",
            backgroundColor: "error.main",
            ':hover': { backgroundColor: "error.main", opacity: 0.9 },
            position: "fixed",
            right: 50,
            bottom: 50,
          }}
        >
          <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>
      </JournalLayout>
  )
}
