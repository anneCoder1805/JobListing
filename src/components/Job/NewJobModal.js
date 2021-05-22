import React, {useState} from 'react'
import {Box, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle, 
    DialogContent, Typography, DialogActions, Button, IconButton, CircularProgress} from '@material-ui/core'
import {Close as CloseIcon} from '@material-ui/icons'
    
const initState = {
    title: '',
    type: 'Full Time',
    companyName: '',
    companyUrl: '',
    location: 'Remote',
    link: '',
    description: '',
    skills: [],
}
export default (props) => {
    const [loading, setLoading] = useState(false)
    const [jobDetails, setJobDetails] = useState(initState);
    
    const handleChange = (e) => {
        e.persist();
        setJobDetails(oldState => ({...oldState, [e.target.name]:e.target.value}))
    }
    
    const addSkills = (skill) => {
        setJobDetails(oldState => ({...oldState, skills: oldState.skills.concat(skill)}))
    }

    const handleSubmit = async() => {
        for(const field in jobDetails) {
            if(typeof jobDetails[field]==='string' && !jobDetails[field])return;
        }
        setLoading(true);
        await props.postJob(jobDetails);
        closeJobPost()
    }

    const closeJobPost = () => {
        setJobDetails(initState);
        setLoading(false)
        props.closeJobPost()
    }

    console.log(jobDetails)
    return(
        <Dialog open={props.newJobPost} fullWidth>
            <DialogTitle>
                <Box display='flex' justifyContent='space-between'>
                Post Job
                <IconButton onClick={closeJobPost}>
                    <CloseIcon/>
                </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FilledInput
                        onChange={handleChange}
                        name='title'
                        value={jobDetails.title} 
                        autoComplete='off' 
                        placeholder='Job Title *' 
                        disableUnderline fullWidth/>
                    </Grid>

                    <Grid item xs={6}>
                        <Select 
                        onChange={handleChange}
                        name='type'
                        value={jobDetails.type}
                        disableUnderline 
                        variant='filled'  
                        fullWidth>
                            <MenuItem value='Full Time'>Full Time</MenuItem>
                            <MenuItem value='Part Time'>Part Time</MenuItem>
                            <MenuItem value='Contract'>Contract</MenuItem>
                            <MenuItem value='One Time Service'>One Time Service</MenuItem>
                        </Select>                  
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput 
                        onChange={handleChange}
                        name='companyName'
                        value={jobDetails.companyName}
                        autoComplete='off'  
                        placeholder='Company/Requestor *' 
                        disableUnderline fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput 
                        onChange={handleChange}
                        name='companyUrl'
                        value={jobDetails.companyUrl}
                        autoComplete='off'  
                        placeholder='Website/ On-Site City*' 
                        disableUnderline fullWidth/>
                    </Grid>

                    <Grid item xs={6}>
                        <Select 
                        onChange={handleChange}
                        name='location'
                        value={jobDetails.location}
                        autoComplete='off'  
                        placeholder='Job Location *' 
                        disableUnderline fullWidth>
                            <MenuItem value='Remote'>Remote</MenuItem>
                            <MenuItem value='On-Site'>On Site</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput 
                        onChange={handleChange}
                        name='link'
                        value={jobDetails.link}
                        autoComplete='off'  
                        placeholder='Job Link/ Email*' 
                        disableUnderline fullWidth/>
                    </Grid>

                    <Grid item xs={12}>
                        <FilledInput 
                        onChange={handleChange}
                        name='description'
                        value={jobDetails.description}
                        autoComplete='off' 
                        placeholder='Job Description'
                        disableUnderline
                        fullWidth
                        multiline rows={4}/>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography variant='subtitle2'>Enter Skills (Separate by Comma and Hit 'Enter' Key) *</Typography>
                    <FilledInput autoComplete='off'  placeholder='' disableUnderline 
                    onKeyPress={(e) => {
                        const a = e.target.value
                        if(e.key==='Enter'){
                        addSkills(a.split(','))}
                    }}
                    fullWidth/>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box color='red' width='100%' display='flex' justifyContent='space-between'>
                    <Typography variant='caption'>*Required</Typography>
                    <Button onClick={handleSubmit}
                    variant='contained' disableElevation
                    color='primary'
                    disabled={loading}>
                        {loading ? (
                         <CircularProgress color='secondary' size={22}/>
                        ): ('Post Job')}</Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}


