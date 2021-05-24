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
    const [applicationDetails, setApplicationDetails] = useState(initState);
    
    const handleChange = (e) => {
        e.persist();
        setApplicationDetails(oldState => ({...oldState, [e.target.name]:e.target.value}))
    }
    
    const addSkills = (skill) => {
        setApplicationDetails(oldState => ({...oldState, skills: oldState.skills.concat(skill)}))
    }

    const handleSubmit = async() => {
        for(const field in applicationDetails) {
            if(typeof applicationDetails[field]==='string' && !applicationDetails[field])return;
        }
        setLoading(true);
        await props.postApplication({jobID: props.applyJobData.data.id, ...applicationDetails});
        closeApplyModal()
    }

    const closeApplyModal = () => {
        setApplicationDetails(initState);
        setLoading(false)
        props.closeApplyModal()
    }

    console.log('Passed on Job Details: ', props.applyJobData.data)
    console.log('Local State applicationDetails: ',applicationDetails);
    return(
        <Dialog open={props.applyJobData.state} fullWidth>
            <DialogTitle>
                <Box display='flex' justifyContent='space-between'>
                Apply for this Post
                <IconButton onClick={closeApplyModal}>
                    <CloseIcon/>
                </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        Applying for: {props.applyJobData.data.title}
                    </Grid>
                    <Grid item xs={6}>
                        Company: {props.applyJobData.data.companyName}
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput
                        onChange={handleChange}
                        name='title'
                        value={applicationDetails.title} 
                        autoComplete='off' 
                        placeholder='Job Title *' 
                        disableUnderline fullWidth/>
                    </Grid>

                    <Grid item xs={6}>
                        <Select 
                        onChange={handleChange}
                        name='type'
                        value={applicationDetails.type}
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
                        value={applicationDetails.companyName}
                        autoComplete='off'  
                        placeholder='Company/Requestor *' 
                        disableUnderline fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput 
                        onChange={handleChange}
                        name='companyUrl'
                        value={applicationDetails.companyUrl}
                        autoComplete='off'  
                        placeholder='Website/ On-Site City*' 
                        disableUnderline fullWidth/>
                    </Grid>

                    <Grid item xs={6}>
                        <Select 
                        onChange={handleChange}
                        name='location'
                        value={applicationDetails.location}
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
                        value={applicationDetails.link}
                        autoComplete='off'  
                        placeholder='Job Link/ Email*' 
                        disableUnderline fullWidth/>
                    </Grid>

                    <Grid item xs={12}>
                        <FilledInput 
                        onChange={handleChange}
                        name='description'
                        value={applicationDetails.description}
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
                        ): ('Submit your Application')}</Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}


