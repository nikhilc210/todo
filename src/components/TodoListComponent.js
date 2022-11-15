import React, { useState } from "react";
import {
  Paper,
  Typography,
  Chip,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useLocalStorageState from "use-local-storage-state";
import uuid from "react-uuid";
import DeleteIcon from "@mui/icons-material/Delete";
export default function TodoListComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(null);
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState(null);
  const [todos, setTodos] = useLocalStorageState("todos", {
    defaultValue: [],
  });

  const addToDo = () => {
    if (name === null) {
      alert("Please enter todo task");
    } else if (date === null) {
      alert("Please select due date");
    } else if (priority === null) {
      alert("Please select priority");
    } else {
      let id = uuid();
      let data = [{ id: id, val: name, priority: priority, due: date }];
      setTodos(todos.concat(data));
      setName(null);
      setDate(null);
      setPriority(null);
      setIsOpen(false);
    }
  };
  const deleteTodo = (id) => {
    let newArr = todos.filter(function (e) {
      return e.id !== id;
    });
    setTodos(newArr);
  };
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ marginTop: "2rem" }}
      >
        <Grid item>
          <Typography variant="h4">TODO APPLICATION</Typography>
        </Grid>
        <Grid item>
          <Fab size="medium" color="primary" onClick={() => setIsOpen(true)}>
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        spacing="2"
        style={{ marginTop: "2rem" }}
      >
        {todos.map((todo) => {
          return (
            <Grid item style={{ marginTop: "1.2rem" }} key={todo.id}>
              <Paper style={{ padding: "0.8rem" }} elevation={4}>
                <Grid
                  container
                  alignContent="center"
                  justifyContent="space-between"
                  style={{ padding: "0.8rem" }}
                >
                  <Grid item>
                    <Typography variant="h6">{todo.val}</Typography>
                  </Grid>

                  <Grid item>
                    {(() => {
                      if (todo.priority === "High") {
                        return (
                          <Chip
                            label={todo.priority}
                            variant="outline"
                            color="error"
                            size="small"
                          />
                        );
                      } else if (todo.priority === "Med") {
                        return (
                          <Chip
                            label={todo.priority}
                            variant="outline"
                            color="warning"
                            size="small"
                          />
                        );
                      } else {
                        return (
                          <Chip
                            label={todo.priority}
                            variant="outline"
                            color="success"
                            size="small"
                          />
                        );
                      }
                    })()}
                    <Button onClick={() => deleteTodo(todo.id)}>
                      <DeleteIcon color="error" />
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ marginLeft: "15px" }}>
                    Due: {todo.due}
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={isOpen} style={{ minWidth: "60vw" }}>
        <DialogTitle>Add New TODO</DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing="5">
            <Grid item>
              <TextField
                label="TODO Text..."
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <FormControl varient="filled" style={{ width: "100%" }}>
                <InputLabel id="priorityLabel">Priority</InputLabel>
                <Select
                  labelId="priorityLabel"
                  label="Priority"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Med">Med</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
                type="date"
                variant="outlined"
                style={{ width: "100%" }}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => addToDo()}>
            ADD
          </Button>
          <Button onClick={() => setIsOpen(false)}>CANCEL</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
