import { colors, List, ListItem, ListItemText, Modal } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import './Todo.css'
import Grid from '@material-ui/core/Grid';
import { db } from './firebase';


// const useStyles = makeStyles({
 
// });

const useStyles = makeStyles((theme) =>({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
//     root: {
//       margin:'0 auto',
//       display: 'block',
//       justifyContent:'center',
//       alignItems:'center',
//       marginBottom:20,
//       maxWidth:750,
//       backgroundColor:colors.lightGreen[100],
//   },
  }),
);

function Todo(props) {
    const classes = useStyles();
    const [open,setOpen]=useState(false);
    const [input,setInput]=useState(''); 

    const handleOpen =()=>{
        setOpen(true);
    };
    
    const updateTodo=()=>{
        db.collection('todo').doc(props.todo.id).set({
            todo: input,
        },{merge:true});
        setOpen(false);
    };
    return (
        <div>
            <Modal  
                open={open}
                onClose={e=>setOpen(false)}>
                    <div className={classes.paper}>
                        <h3>Edit Todo 📝</h3>
                        <input placeholder={props.todo.todo} style={{padding:'3px', fontSize:'16px'}} type="input"  value={input} onChange={e=>setInput(e.target.value)}/>
                        <Button type="button" color='secondary' onClick={updateTodo}>update todo</Button>
                    </div>
            </Modal>
            {/* <Grid
                container
                spacing={0}
                direction="column"
                // alignItems="center"
                justify="center"
                style={{ minWidth:'100vh' }}
                >
                <Grid item xs={3}> */}
                    <div className="cardContainer">
                    <CardContent>
                        <List className="todo_list">
                            <ListItem>
                                <ListItemText className="listText" primary={props.todo.todo} secondary="work to Todo⏰"/>
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions className="cardBtn">
                        <Button size="small" color="secondary" onClick={event=>{db.collection('todo').doc(props.todo.id).delete()}} style={{backgroundColor: colors.green[100], }}>Delete</Button>
                        <Button size="small" color='default' onClick={e=>setOpen(true)} style={{backgroundColor: colors.green[100],}}>Edit <i></i></Button>
                    </CardActions>
                    </div>  
                {/* </Grid>      
            </Grid> */}

                     
        </div>
    )
}

export default Todo
