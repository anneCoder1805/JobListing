import React from 'react'
import {Box, Grid, Dialog, DialogTitle, 
    DialogContent, Typography,
    IconButton, makeStyles} from '@material-ui/core'
import {Close as CloseIcon} from '@material-ui/icons'
import {format} from 'date-fns'

const useStyles = makeStyles((theme) => ({
    info: {
        '&>*':{
            margin: '4px',
        }
    },
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: '14.5px',
        borderRadius: '5px',
        fontWeight: 600,
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
    }
}));

export default (props) => {
    const classes = useStyles()
    return(
        <Dialog open={!!Object.keys(props.job).length} fullWidth>
            <DialogTitle>
                <Box display='flex' justifyContent='space-between'>
                {props.job.title} 
                <IconButton onClick={props.closeModal}>
                    <CloseIcon/>
                </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box>
                   <Box className={classes.info} display='flex'>
                      <Typography variant='subtitle1'> Company/Requestor: </Typography>
                      <Typography variant='subtitle1'> {props.job.companyName} </Typography>  
                    </Box>
                    <Box className={classes.info} display='flex'>
                      <Typography variant='subtitle1'> Posted On: </Typography>
                      <Typography variant='subtitle1'> {props.job.postedOn && format(props.job.postedOn,'dd/MMM/yyyy HH:MM')} </Typography>  
                    </Box> 
                    <Box className={classes.info} display='flex'>
                      <Typography variant='subtitle1'> Location: </Typography>
                      <Typography variant='subtitle1'> {props.job.location} </Typography>  
                    </Box>
                    <Box className={classes.info} display='flex'>
                      <Typography variant='subtitle1'> Job Type: </Typography>
                      <Typography variant='subtitle1'> {props.job.type} </Typography>  
                    </Box>
                    <Box className={classes.info} display='flex'>
                      <Typography variant='subtitle1'> Comapany Website/Requestor City: </Typography>
                      <Typography variant='subtitle1'> {props.job.companyUrl} </Typography>  
                    </Box>
                    <Box className={classes.info} display='flex'>
                      <Typography variant='subtitle1'> Job Link/ Contact: </Typography>
                      <Typography variant='subtitle1'> {props.job.link} </Typography>  
                    </Box>
                    <Box display='flex'>
                      <Typography variant='subtitle1'> Description: {props.job.description}</Typography> 
                    </Box>
                    <Box ml={0.5}>
                      <Typography variant='subtitle1'> Skills: </Typography>
                      <Grid container alignItems='center'>
                          {props.job.skills && 
                          props.job.skills.map((skill)=>(
                              <Grid item key={skill} className={classes.skillChip}>
                                  {skill} </Grid>
                          ))}
                      </Grid>  
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}