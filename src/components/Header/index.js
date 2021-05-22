import React from 'react'
import {Box, Grid, Typography, makeStyles,Button} from '@material-ui/core'


const useStyles = makeStyles({
    wrapper: {
        backgroundColor: '#039fbe',
        border:'1px solid rgba(255,255,255,1)',
        color: 'white',
        '&:hover': {
            backgroundColor: 'white',
            color: '#039fbe'
        },
    },
    });

export default (props) => {
    const classes = useStyles()
    return(
        <Box py={10} bgcolor='secondary.main' color='white'>
        <Grid container justify='center'>
            <Grid item xs={10}>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant='h4'>
                        Open Job Listing
                    </Typography>
                    <Button onClick={props.openNewJobPost} 
                    className={classes.wrapper}
                    variant='contained' disableElevation>
                        Post a Job
                    </Button>
                </Box>
            </Grid>
        </Grid>
    </Box>
);
}
