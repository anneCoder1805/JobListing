import React from 'react'
import {Box, Grid, Typography, Button, makeStyles} from '@material-ui/core'
import {differenceInHours} from 'date-fns'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        backgroundColor: 'rgba(255,255,255, 0.7)',
        backgroundSize:'cover',
        color: 'black',
        border: '1px solid #e8e8e8',
        cursor: 'pointer',
        transition: '0.3s',
        margin: '10px',
        borderRadius: '5px',
        '&:hover': {
            boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.1)',
            borderLeft: '6px solid white',
        },
    },
    companyName: {
        fontSize: '13.5px',
        backgroundColor: 'rgba(0,0,0,0)',
        padding: theme.spacing(0.75),
        border: '1px solid black',
        borderRadius: '5px',
        display: 'inline-block',
        fontWeight: 600,
        color:'black',
    },
    skillChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: '14.5px',
        borderRadius: '5px',
        fontWeight: 600,
        backgroundColor: "#339989",
        color: '#fff',
    },
    bstyle:{
        backgroundColor:'#131515',
        color: 'white',
        '&:hover':{
            backgroundColor:'rgba(0,0,0,0)',
            color: 'black'
        }
    },
    black:{
        color:'black',
    },
    boldT:{
        fontWeight:'bold',
    }
}));

export default (props) => {
    const classes = useStyles()
    return (
        <Box p={2} className={classes.wrapper}>
           <Grid container alignItems='center'>
                <Grid item xs>
                    <Typography variant='subtitle1' className={classes.boldT}>{props.title}</Typography>
                    <Typography className={classes.companyName} variant='subtitle1'>{props.companyName}</Typography>
                </Grid>
                <Grid item container xs>
                    {props.skills.map(skill =>
                        <Grid key={skill} className={classes.skillChip} item>{skill}
                    </Grid>)}
                </Grid>
                <Grid item container direction='column' alignItems='flex-end' xs>
                    <Grid item>
                        <Typography className={classes.black} variant='caption'>{differenceInHours(Date.now(), props.postedOn)} hours ago | {props.type} | {props.location}</Typography>
                    </Grid>
                    <Grid item>
                        <Box mt={2}>
                            <Button onClick={props.openApplyModal} className={classes.bstyle} variant='outlined'>Apply</Button>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box mt={2}>
                            <Button onClick={props.open} className={classes.bstyle} variant='outlined'>Check Details</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid> 
        </Box>
    )
}

