import React, {useState} from 'react'
import {Box, Button, Select, MenuItem, makeStyles, CircularProgress} from '@material-ui/core'

const useStyles = makeStyles({
    wrapper: {
        padding: 2,
        marginTop: -30,
        marginBottom: 30,
        backgroundColor: '#fff',
        display: 'flex',
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        '& > *': {
            flex: 1,
            height: '45px',
            margin: '8px',
        },
    },
    bstyle:{
        backgroundColor:"#339989",
    }
});
export default (props) => {
    const [loading, setLoading] = useState(false)
    const [jobSearch, setJobSearch] = useState({
        type: 'Full Time',
        location: 'Remote',
    });

    const handleChange = (e) => {
        e.persist();
        setJobSearch((oldState) =>
         ({...oldState, [e.target.name]
            :e.target.value}));
    }

    const search = async() => {
        setLoading(true);
        await props.fetchJobsCustom(jobSearch)
        setLoading(false);
    }

    const classes = useStyles()
    return (
        <Box className={classes.wrapper} >
            <Select onChange={handleChange} value={jobSearch.type} name='type' disableUnderline variant='filled'>
                <MenuItem value='Full Time'>Full Time</MenuItem>
                <MenuItem value='Part Time'>Part Time</MenuItem>
                <MenuItem value='Contract'>Contract</MenuItem>
                <MenuItem value='One Time Service'>One Time Service</MenuItem>
            </Select>
            <Select onChange={handleChange} value={jobSearch.location} name='location' disableUnderline variant='filled'>
                <MenuItem value='Remote'>Remote</MenuItem>
                <MenuItem value='In-Office'>In-Office</MenuItem>
                <MenuItem value='On-Site'>On-Site</MenuItem>
            </Select>
            <Button disabled={loading} 
            variant='contained' 
            className={classes.bstyle} 
            disableElevation
            onClick={search}>
            {loading ? (
                         <CircularProgress color='secondary' size={22}/>
                        ): ('Search')}
            </Button>
        </Box>
    )
}
