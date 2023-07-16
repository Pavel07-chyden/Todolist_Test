import React, {useCallback} from 'react'
import './App.css';
import {TaskType, Todolist} from 'Todolist';
import {AddItemForm} from 'AddItemForm';
import {AppBar, Container, Grid,  Paper, Toolbar, Typography} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "state/store";
import {addTodolistItem, changeTodolistFilter, changeTodoTitle, removeTodolistItem} from "state/todolistSlice";
import {addTasks, changeTasksStatus, changeTasksTitle, removeTasks} from "state/taskSlice";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

function AppWithRedux() {
  const todolists = useSelector<RootState, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)
  const dispatch = useDispatch();

  const removeTask = useCallback(function (id: string, todolistId: string) {
    dispatch(removeTasks({id, todolistId}));
  }, [dispatch]);

  const addTask = useCallback(function (title: string, todolistId: string) {
    dispatch(addTasks({title, todolistId}));
  }, [dispatch]);

  const changeStatus = useCallback(function (taskId: string, isDone: boolean, todolistId: string, ) {
    dispatch(changeTasksStatus({taskId, isDone, todolistId}));
  }, [dispatch]);

  const changeTaskTitle = useCallback(function (taskId: string,todolistId: string, title: string) {
    dispatch(changeTasksTitle({taskId,  todolistId, title}))
  }, [dispatch]);

  const changeFilter = useCallback(function (filter: FilterValuesType, todolistId: string) {
    dispatch(changeTodolistFilter({todolistId, filter}));
  }, [dispatch]);

  const removeTodolist = useCallback(function (todolistId: string) {
    dispatch(removeTodolistItem({todolistId}))
  }, [dispatch]);

  const changeTodolistTitle = useCallback( (title: string, todolistId: string,) => {
    dispatch(changeTodoTitle({title, todolistId}))
  }, [dispatch])

   const addTodolist = useCallback( (title: string) => {
     const newTodolist:TodolistType = {id: v1(), title: title, filter: "all"}
     dispatch(addTodolistItem({newTodolist}));
  }, [dispatch]);

  return (
      <div>
        <AppBar position="static" style ={{background:"#764abc"}} >
          <Toolbar >
            <Typography variant="h6">
               Todo List
            </Typography>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid container style={{padding: "20px"}}>
            <AddItemForm  addItem={addTodolist}/>
          </Grid>
          <Grid container spacing={3}>
            {todolists?.map(tl => {
                let allTodolistTasks = tasks[tl.id];
                let tasksForTodolist = allTodolistTasks;

                return <Grid item key={tl.id}>
                  <Paper style={{padding: "10px"}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid>
              })
            }
          </Grid>
        </Container>
      </div>
  );
}

export default AppWithRedux;
