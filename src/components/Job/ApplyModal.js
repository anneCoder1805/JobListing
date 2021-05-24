import React, {useState} from 'react'
import {Box, Grid, FilledInput, Select, MenuItem, Dialog, DialogTitle, 
    DialogContent, Typography, DialogActions, Button, IconButton, CircularProgress} from '@material-ui/core'
import {Close as CloseIcon} from '@material-ui/icons'
    
const initState = {
    name: '',
    emailaddress: '',
    age: '',
    address: '',
    gender :'Male',
    desiredsalary: '',
    experience: '',
    anythingelse: '',
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
                        name='name'
                        value={applicationDetails.name} 
                        autoComplete='off' 
                        placeholder='Name *' 
                        disableUnderline fullWidth/>
                    </Grid>

                    <Grid item xs={6}>
                        <FilledInput 
                        onChange={handleChange}
                        name='emailaddress'
                        value={applicationDetails.emailaddress}
                        autoComplete='off'  
                        placeholder='Email address *' 
                        disableUnderline fullWidth/>
                    </Grid>
                    
                     <Grid item xs={12}>
                        <FilledInput 
                        onChange={handleChange}
                        name='address'
                        value={applicationDetails.address}
                        autoComplete='off'  
                        placeholder='Address *' 
                        disableUnderline fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput 
                        onChange={handleChange}
                        name='age'
                        value={applicationDetails.age}
                        autoComplete='off'  
                        placeholder='Age *' 
                        disableUnderline fullWidth/>
                    </Grid>

                    <Grid item xs={6}>
                        <Select 
                        onChange={handleChange}
                        name='gender'
                        value={applicationDetails.gender}
                        autoComplete='off'  
                        placeholder='Gender *' 
                        disableUnderline fullWidth>
                            <MenuItem value='Male'>Male</MenuItem>
                            <MenuItem value='Female'>Female</MenuItem>
                            <MenuItem value='prefer not to say'>Prefer not to say</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput 
                        onChange={handleChange}
                        name='experience'
                        value={applicationDetails.experience}
                        autoComplete='off'  
                        placeholder='Experience(in years) *' 
                        disableUnderline fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput 
                        onChange={handleChange}
                        name='desiredsalary'
                        value={applicationDetails.desiredsalary}
                        autoComplete='off'  
                        placeholder='Desired Salary ' 
                        disableUnderline fullWidth/>
                    </Grid>

                    <Grid item xs={12}>
                        <FilledInput 
                        onChange={handleChange}
                        name='anythingelse'
                        value={applicationDetails.anythingelse}
                        autoComplete='off' 
                        placeholder='Tell us more about yourself and past experience'
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


