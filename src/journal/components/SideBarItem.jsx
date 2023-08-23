import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNode } from "../../store/journal/journalSlice"

export const SideBarItem = ({ id, title = '', body, date, imageUrls = [] }) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0, 17) + '...'
      : title;
  }, [title])

  const onSelectNote = () => {
    const note = { id, title, body, date, imageUrls };

    dispatch(setActiveNode(note));
  };

  return (
    <ListItem disablePadding >
      <ListItemButton onClick={onSelectNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} title={ title } />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
